from pydantic import BaseModel, Field

class ChatRequest(BaseModel):
    prompt: str = Field(
        ...,
        description="User question for OpsPilot AI",
        examples=[
            "How can I reduce emergency department waiting times?"
        ]
    )