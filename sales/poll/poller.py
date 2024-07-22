import django
import os
import sys
import time
import traceback
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import AutomobileVO
from sales_rest.models import AutomobileVO


def poll():
    while True:
        print("Sales poller polling for data")
        try:
            response = requests.get("http://inventory-api:8000/api/automobiles/")
            response.raise_for_status()
            content = response.json()

            for automobile_data in content['autos']:
                AutomobileVO.objects.update_or_create(
                    vin=automobile_data["vin"],
                    defaults={'sold': automobile_data["sold"]}
                )

        except Exception as e:
            traceback.print_exc()
            print("An error occurred:", e, file=sys.stderr)

        time.sleep(60)



if __name__ == "__main__":
    poll()
