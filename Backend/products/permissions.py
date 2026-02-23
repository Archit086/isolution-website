from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow Admins to edit/delete/create an object.
    Others can only do safe, read-only operations (GET).
    """
    
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
            
        return bool(request.user and request.user.is_authenticated and request.user.role == 'Admin')
