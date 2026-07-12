from fastapi import APIRouter, HTTPException
import traceback

from models import ChatRequest, ChatResponse
from services.watsonx_service import get_guidance

router = APIRouter(
    prefix="",
    tags=["Hospital Operations AI"]
)


@router.post(
    "/ask",
    response_model=ChatResponse,
    summary="Generate operational guidance",
    description="Returns structured operational guidance for hospital workflows.",
)
def ask(request: ChatRequest):

    try:

        result = get_guidance(request.prompt)

        return ChatResponse(
            success=True,
            response=result,
        )

    except Exception as e:

        traceback.print_exc()

        raise HTTPException(
            status_code=500,
            detail={
                "success": False,
                "error": str(e),
            },
        )