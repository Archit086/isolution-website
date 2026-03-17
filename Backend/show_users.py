import os
import django
import sys

# Set up Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

print("==== Registered Users ====")
count = User.objects.count()
print(f"Total Users: {count}")

if count > 0:
    for u in User.objects.all():
        u_dict = u.__dict__
        email = u_dict.get('email', 'No Email')
        username = u_dict.get('username', 'No Username')
        password = u.password if hasattr(u, "password") else "No password field"
        
        # Determine main identifier
        identifier = email if email != 'No Email' else username
        
        print(f"User: {identifier}")
        print(f"Role/Type: {u_dict.get('role', 'N/A')}")
        print(f"Password Hash: {password}")
        print("-" * 30)
else:
    print("No users found.")
