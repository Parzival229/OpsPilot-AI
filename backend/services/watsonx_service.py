from ibm import ask_ibm

def get_guidance(prompt: str):
    """
    Sends the user prompt to IBM watsonx.ai
    and returns the response.
    """
    return ask_ibm(prompt)
    