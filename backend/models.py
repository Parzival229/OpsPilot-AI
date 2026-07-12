from pydantic import BaseModel, Field


# -------------------------------------------------------------------
# Incoming Request
# -------------------------------------------------------------------

class ChatRequest(BaseModel):
    prompt: str = Field(
        ...,
        description="Hospital operations query from the user.",
        examples=[
            "How should I manage emergency department overcrowding?"
        ]
    )


# -------------------------------------------------------------------
# Structured AI Response Models
# -------------------------------------------------------------------

class StaffResponsibility(BaseModel):
    role: str
    responsibility: str


class StructuredResponse(BaseModel):
    scenario: str

    summary: str

    workflow: list[str]

    responsibleStaff: list[StaffResponsibility]

    requiredDocumentation: list[str]

    safetyCompliance: list[str]

    relatedProcedures: list[str]

    operationalChecklist: list[str]


# -------------------------------------------------------------------
# API Response Wrapper
# -------------------------------------------------------------------

class ChatResponse(BaseModel):
    success: bool

    response: StructuredResponse