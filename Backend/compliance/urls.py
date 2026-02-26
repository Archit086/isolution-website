from django.urls import path
from .views import (
    ComplianceUploadView, 
    CompliancePendingListView, 
    ComplianceApproveView, 
    ComplianceDeleteView
)

urlpatterns = [
    path('upload/', ComplianceUploadView.as_view(), name='compliance-upload'),
    path('pending/', CompliancePendingListView.as_view(), name='compliance-pending'),
    path('<int:pk>/approve/', ComplianceApproveView.as_view(), name='compliance-approve'),
    path('<int:pk>/', ComplianceDeleteView.as_view(), name='compliance-delete'),
]
