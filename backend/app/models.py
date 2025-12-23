from pydantic import BaseModel, Field

MOODS = {
    "happy": {"color": "#FFD700"},
    "sad": {"color": "#1E90FF"},
    "angry": {"color": "#FF4500"},
}


# -------------------------
# Request Models
# -------------------------

class LyricsInput(BaseModel):
    lyrics: str = Field(..., min_length=1, description="Song lyrics to analyze")


# -------------------------
# Response Models
# -------------------------

class PredictionResponse(BaseModel):
    mood: str
    lyrics: str
    success: bool = True


class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    model_error: str | None = None
    
    model_config = {
        "protected_namespaces": ()
    }


class MessageResponse(BaseModel):
    message: str
    description: str
    
