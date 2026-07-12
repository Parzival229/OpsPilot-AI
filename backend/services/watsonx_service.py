from ibm import ask_ibm

def get_guidance(prompt: str):
    """
    Sends the user prompt to IBM watsonx.ai
    and returns the IBM response object.
    """

    response = ask_ibm(prompt)

    if response.status_code != 200:
        raise Exception(response.text)

    return response