from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import ReviewRequest
from gemini_service import analyze_review

app = FastAPI(
    title="TrustChain AI API",
    description="AI-powered fake review detector — Team NeuralCart · PS070063",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "🛡️ TrustChain AI API is running!",
        "team": "NeuralCart",
        "team_id": "PS070063"
    }

@app.post("/analyze")
def analyze(request: ReviewRequest):
    review = request.review.strip()
    if not review:
        return {"verdict": "ERROR", "confidence": 0,
                "reasons": ["Empty review"], "summary": "Please enter a review."}
    if len(review) < 10:
        return {"verdict": "ERROR", "confidence": 0,
                "reasons": ["Too short"], "summary": "Review is too short to analyze."}
    return analyze_review(review)