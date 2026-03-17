import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from django.apps import apps

print("==== Database ORM Overview ====")
for app_config in apps.get_app_configs():
    if app_config.name in ['accounts', 'api', 'compliance', 'orders', 'products']:
        print(f"\nApp: {app_config.name}")
        for model in app_config.get_models():
            count = model.objects.count()
            print(f"  - Model: {model.__name__} | Total Count: {count}")
            if count > 0:
                print("    Sample data (up to 3 items):")
                samples = model.objects.all()[:3]
                try:
                    for obj in samples:
                        # Attempt to get a dictionary representation if possible, otherwise just string repr
                        try:
                            fields = getattr(obj, '__dict__', {})
                            display_fields = {k: v for k, v in fields.items() if not k.startswith('_')}
                            print(f"      * {obj} -> {display_fields}")
                        except Exception:
                            print(f"      * {obj}")
                except Exception as e:
                    print(f"      * Error fetching: {e}")
