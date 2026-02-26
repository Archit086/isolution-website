from rest_framework import permissions

class IsAuthorityUser(permissions.BasePermission):
    """
    Allows access only to users with the 'Authority' role.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'Authority')

class IsAdminUser(permissions.BasePermission):
    """
    Allows access only to users with the 'Admin' role.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'Admin')
