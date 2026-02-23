from rest_framework import serializers
from django.db import transaction
from .models import Order, OrderItem
from products.models import Product

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price_at_purchase']
        read_only_fields = ['price_at_purchase']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Order
        fields = ['id', 'user', 'total_amount', 'status', 'payment_status', 'created_at', 'items']
        read_only_fields = ['id', 'user', 'total_amount', 'status', 'payment_status', 'created_at']

class OrderCreateSerializer(serializers.Serializer):
    """
    Accepts a list of product IDs and quantities to create an order transactionally.
    Example Input: [{"product": 1, "quantity": 2}, {"product": 3, "quantity": 1}]
    """
    class OrderItemInputSerializer(serializers.Serializer):
        product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
        quantity = serializers.IntegerField(min_value=1)

    items = OrderItemInputSerializer(many=True)

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        user = self.context['request'].user
        
        # 1. Start an atomic database transaction
        with transaction.atomic():
            order = Order.objects.create(user=user, total_amount=0)
            total_amount = 0
            
            for item_data in items_data:
                product_instance = item_data['product']
                requested_qty = item_data['quantity']
                
                # 2. Lock the row to prevent race conditions from concurrent orders
                product = Product.objects.select_for_update().get(id=product_instance.id)
                
                # 3. Validate stock capacity
                if product.stock < requested_qty:
                    raise serializers.ValidationError({
                        f"Product {product.name}": f"Not enough stock. Requested {requested_qty}, Available {product.stock}"
                    })
                
                # 4. Deduct stock and save
                product.stock -= requested_qty
                product.save()

                # 5. Create the order item
                price = product.price
                OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=requested_qty,
                    price_at_purchase=price
                )
                
                # Update tally
                total_amount += (price * requested_qty)

            # finalize order
            order.total_amount = total_amount
            order.save()

        return order
