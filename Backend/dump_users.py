import os
import django

# Set up Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

with open("users_list.txt", "w", encoding="utf-8") as f:
    f.write("==== Registered Users ====\n")
    count = User.objects.count()
    f.write(f"Total Users: {count}\n\n")

    if count > 0:
        for u in User.objects.all():
            u_dict = u.__dict__
            email = u_dict.get('email', 'No Email')
            username = u_dict.get('username', 'No Username')
            password = u.password if hasattr(u, "password") else "No password field"
            
            identifier = email if email != 'No Email' else username
            role = u_dict.get('role', 'N/A')
            
            f.write(f"User: {identifier}\n")
            f.write(f"Role: {role}\n")
            f.write(f"Password Hash: {password}\n")
            f.write("-" * 50 + "\n")
    else:
        f.write("No users found.\n")

print("Created users_list.txt")
