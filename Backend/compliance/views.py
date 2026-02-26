from rest_framework import generics, permissions
from django.utils import timezone
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Compliance
from .serializers import ComplianceSerializer
from .permissions import IsAuthorityUser, IsAdminUser

class ComplianceUploadView(generics.CreateAPIView):
    """ Allows any authenticated user to upload a compliance document. """
    queryset = Compliance.objects.all()
    serializer_class = ComplianceSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)

class CompliancePendingListView(generics.ListAPIView):
    """ Authority only: List all pending documents """
    serializer_class = ComplianceSerializer
    permission_classes = [IsAuthorityUser]

    def get_queryset(self):
        return Compliance.objects.filter(approval_status='Pending')


class ComplianceApproveView(generics.UpdateAPIView):
    """ Authority only: Approve or reject a document """
    queryset = Compliance.objects.all()
    serializer_class = ComplianceSerializer
    permission_classes = [IsAuthorityUser]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        new_status = request.data.get('approval_status')
        
        if new_status not in ['Approved', 'Rejected']:
            return Response(
                {"detail": "You must supply an approval_status of 'Approved' or 'Rejected'."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        instance.approval_status = new_status
        instance.approved_by = request.user
        instance.approved_at = timezone.now()
        instance.save()
        
        return Response(self.get_serializer(instance).data)


class ComplianceDeleteView(generics.DestroyAPIView):
    """ Admin only: Delete a compliance record """
    queryset = Compliance.objects.all()
    serializer_class = ComplianceSerializer
    permission_classes = [IsAdminUser]
