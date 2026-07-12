from fastapi import APIRouter, HTTPException

from models import ChatRequest, ChatResponse
from ibm import ask_ibm

router = APIRouter()


@router.post("/ask", response_model=ChatResponse)
def ask(request: ChatRequest):

    if not request.message.strip():
        raise HTTPException(
            status_code=400,
            detail="Message cannot be empty."
        )

    response = ask_ibm(request.message)

    if response.status_code != 200:

        return ChatResponse(
            success=False,
            error=f"IBM returned {response.status_code}"
        )

    return ChatResponse(
        success=True,
        answer=response.text
    )