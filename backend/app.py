from fastapi.middleware.cors import CORSMiddleware
from ibm import ask_ibm
from fastapi import FastAPI
from config import IBM_API_KEY, IBM_DEPLOYMENT_ENDPOINT
from auth import get_iam_token

app = FastAPI(
    title="OpsPilot AI Backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from config import IBM_API_KEY

@app.get("/debug")
def debug():
    return {
        "length": len(IBM_API_KEY),
        "starts_with": IBM_API_KEY[:15],
        "ends_with": IBM_API_KEY[-10:]
    }


@app.get("/auth-test")
def auth_test():
    token = get_iam_token()

    return {
        "success": True,
        "token_preview": token[:30] + "..."
    }


@app.get("/deployment-test")
def deployment_test():

    response = ask_ibm("Hello")

    return {
        "status_code": response.status_code,
        "response": response.json()
    }    

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "OpsPilot AI Backend",
        "version": "1.0.0-beta"
    }    