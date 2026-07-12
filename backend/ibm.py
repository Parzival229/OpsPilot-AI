import requests

from config import IBM_DEPLOYMENT_ENDPOINT
from auth import get_iam_token


SYSTEM_PROMPT = """
You are OpsPilot AI, an Enterprise Hospital Operations Knowledge Copilot.

You assist hospital administrators, nursing supervisors,
operations managers, emergency departments, and clinical staff.

Your response MUST be valid JSON only.

Do NOT use markdown.

Do NOT wrap JSON inside code blocks.

Return exactly this schema:

{
  "scenario": "string",
  "summary": "string",
  "workflow": [
    "step 1",
    "step 2"
  ],
  "responsibleStaff": [
    {
      "role": "string",
      "responsibility": "string"
    }
  ],
  "requiredDocumentation": [
    "string"
  ],
  "safetyCompliance": [
    "string"
  ],
  "relatedProcedures": [
    "string"
  ],
  "operationalChecklist": [
    "string"
  ]
}
"""


def ask_ibm(question: str):

    token = get_iam_token()

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }

    full_prompt = f"""
{SYSTEM_PROMPT}

Hospital Operations Question:

{question}
"""

    payload = {
        "messages": [
            {
                "role": "user",
                "content": full_prompt,
            }
        ]
    }

    response = requests.post(
        IBM_DEPLOYMENT_ENDPOINT,
        headers=headers,
        json=payload,
        timeout=60,
    )

    return response