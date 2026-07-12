from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.chat import router as chat_router

app = FastAPI(
    title="OpsPilot AI API",
    description="Secure backend for the OpsPilot AI Enterprise Healthcare Operations Knowledge Copilot.",
    version="1.0.0-beta",
)

# -------------------------
# CORS Configuration
# -------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# API Routes
# -------------------------

app.include_router(chat_router)

# -------------------------
# Root Endpoint
# -------------------------

@app.get("/")
def root():
    return {
        "status": "running",
        "service": "OpsPilot AI Backend",
        "version": "1.0.0-beta"
    }

# -------------------------
# Health Check
# -------------------------

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "OpsPilot AI Backend",
        "version": "1.0.0-beta"
    }