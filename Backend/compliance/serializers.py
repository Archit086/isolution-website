from rest_framework import serializers
from .models import Compliance
from products.models import Product

class ComplianceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compliance
        fields = '__all__'
        read_only_fields = (
            'uploaded_by', 
            'approval_status', 
            'approved_by', 
            'approved_at', 
            'created_at',
        )

    def to_internal_value(self, data):
        # We handle multipart formData nesting where simple values get turned into lists
        if hasattr(data, '_mutable'):
            data = data.copy()
        
        return super().to_internal_value(data)
