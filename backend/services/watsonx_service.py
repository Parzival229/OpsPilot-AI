import json

from ibm import ask_ibm
from models import StructuredResponse


def get_guidance(prompt: str) -> StructuredResponse:
    """
    Sends a prompt to IBM watsonx.ai,
    parses the structured JSON response,
    validates it with Pydantic,
    and returns a StructuredResponse object.
    """

    response = ask_ibm(prompt)

    # -----------------------------
    # IBM API Error
    # -----------------------------
    if response.status_code != 200:

        error_text = response.text

        if "token_quota_reached" in error_text:
            raise Exception(
                "IBM watsonx.ai quota has been exhausted for this project. "
                "The backend is working correctly, but IBM is currently refusing inference requests. "
                "Please try again after the quota resets or use another deployment."
            )

        raise Exception(
            f"IBM watsonx returned {response.status_code}: {error_text}"
        )

    # -----------------------------
    # Parse IBM Response
    # -----------------------------
    try:
        data = response.json()
    except Exception:
        raise Exception("Unable to parse IBM response as JSON.")

    # -----------------------------
    # Extract Generated Content
    # -----------------------------
    try:
        content = data["choices"][0]["message"]["content"]
    except (KeyError, IndexError):
        raise Exception(
            "Unexpected response format received from IBM watsonx."
        )

    # -----------------------------
    # Convert AI JSON String
    # -----------------------------
    try:
        parsed = json.loads(content)
    except json.JSONDecodeError:
        raise Exception(
            "IBM returned invalid JSON. Adjust the system prompt or model output."
        )

    # -----------------------------
    # Validate Structure
    # -----------------------------
    try:
        structured_response = StructuredResponse.model_validate(parsed)
    except Exception as e:
        raise Exception(
            f"Response validation failed: {str(e)}"
        )

    return structured_response