from pydantic import BaseModel
from typing import List

class ReviewRequest(BaseModel):
    review: str

class ReviewResponse(BaseModel):
    verdict: str
    confidence: int
    reasons: List[str]
    summary: str