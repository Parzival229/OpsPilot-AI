from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.chat import router as chat_router

app = FastAPI(
    title="OpsPilot AI Backend",
    version="1.0.0",
    description="Enterprise Healthcare Operations AI API powered by IBM watsonx.ai"
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

app.include_router(chat_router)

@app.get("/")
def root():
    return {
        "status": "running",
        "service": "OpsPilot AI Backend"
    }