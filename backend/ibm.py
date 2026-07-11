import requests

from config import IBM_DEPLOYMENT_ENDPOINT
from auth import get_iam_token


def ask_ibm(question: str):

    token = get_iam_token()

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    payload = {
        "messages": [
            {
                "role": "user",
                "content": question
            }
        ]
    }

    response = requests.post(
        IBM_DEPLOYMENT_ENDPOINT,
        headers=headers,
        json=payload,
        timeout=60
    )

    return response