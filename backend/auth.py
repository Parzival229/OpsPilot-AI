import requests

from config import IBM_API_KEY
from cache import get_cached_token, save_token

IAM_URL = "https://iam.cloud.ibm.com/identity/token"


def get_iam_token():

    cached = get_cached_token()

    if cached is not None:
        print("✓ Using cached IAM token")
        return cached

    print("🔄 Requesting new IAM token...")

    response = requests.post(
        IAM_URL,
        headers={
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data={
            "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
            "apikey": IBM_API_KEY
        }
    )

    if response.status_code != 200:
        raise Exception(response.text)

    data = response.json()

    save_token(
        data["access_token"],
        data["expires_in"]
    )

    return data["access_token"]