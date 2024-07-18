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

# Import models from service_rest, here. Ignore vs-code error hinting
from service_rest.models import AutomobileVO
# from service_rest.models import Something




def poll():
    while True:
        print("Service poller polling for data")
        try:
            # Write your polling logic, here
            response = requests.get("http://inventory-api:8000/api/automobiles/")
            content = response.json()
            # Do not copy entire file
            print("R data:", content)

            for automobible_data in content['autos']:
                AutomobileVO.objects.update_or_create(
                    vin=automobible_data["vin"],
                    defaults={'sold': automobible_data["sold"]}
                )

        except Exception as e:
            traceback.print_exc()
            print(e, file=sys.stderr)

        time.sleep(60)


if __name__ == "__main__":
    poll()
