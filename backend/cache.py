from datetime import datetime, timedelta

cached_token = None
token_expiry = None


def save_token(token: str, expires_in: int):

    global cached_token
    global token_expiry

    cached_token = token

    # Refresh 5 minutes before IBM expiry
    token_expiry = datetime.utcnow() + timedelta(seconds=expires_in - 300)


def get_cached_token():

    global cached_token
    global token_expiry

    if cached_token is None:
        return None

    if datetime.utcnow() >= token_expiry:
        return None

    return cached_token