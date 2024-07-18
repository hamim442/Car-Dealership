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


from sales_rest.models import AutomobileVO
def poll():
    while True:
        print("Sales poller polling for data")
        try:
            # Write your polling logic, here
            response = requests.get("http://inventory-api:8000/api/automobiles/")
            response.raise_for_status()  # Raise an error for bad status codes
            automobiles = response.json()
            print("recieve data;", automobiles)
            for auto in automobiles:
                AutomobileVO.objects.update_or_create(
                    vin=auto['vin'],
                    defaults={'sold': auto['sold']}
                )
        except requests.RequestException as e:
            print("Network error:", e, file=sys.stderr)
            traceback.print_exc()
        except Exception as e:
            print("An error occurred:", e, file=sys.stderr)
            traceback.print_exc()
        time.sleep(60)
if __name__ == "__main__":
    poll()







