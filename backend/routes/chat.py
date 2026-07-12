from fastapi import APIRouter, HTTPException

from models import ChatRequest
from services.watsonx_service import get_guidance

router = APIRouter()

@router.post("/ask")
def ask(request: ChatRequest):

    try:

        response = get_guidance(request.prompt)

        return response.json()

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )