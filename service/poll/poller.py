import django
import os
import sys
import time
import traceback
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

from service_rest.models import AutomobileVO

def poll():
    while True:
        print("Service poller polling for data")
        try:
            response = requests.get("http://inventory-api:8000/api/automobiles/")
            content = response.json()
            print("R data:", content)

            for automobile_data in content['autos']:
                print("Automobile data:", automobile_data)

                defaults = {'sold': automobile_data['sold']}
                AutomobileVO.objects.update_or_create(
                    vin=automobile_data["vin"],
                    defaults=defaults
                )

        except Exception as e:
            traceback.print_exc()
            print(e, file=sys.stderr)

        time.sleep(60)

if __name__ == "__main__":
    poll()
