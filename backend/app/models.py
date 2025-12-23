from pydantic import BaseModel, Field

MOOD_COLORS = {
    "sadness":  "#4A6FA5",  # muted blue – low energy, inward
    "joy":      "#F4C430",  # warm yellow – brightness, uplift
    "love":     "#E63973",  # soft pink/red – warmth, attachment
    "anger":    "#D62828",  # strong red – heat, intensity
    "fear":     "#6A4C93",  # deep purple – unease, uncertainty
    "surprise": "#2EC4B6",  # teal – alert, sharp, unexpected
}

MOOD_EMOJIS = {
    "sadness":  "😢",  # muted blue – low energy, inward
    "joy":      "😊",  # warm yellow – brightness, uplift
    "love":     "😍",  # soft pink/red – warmth, attachment
    "anger":    "😠",  # strong red – heat, intensity
    "fear":     "😨",  # deep purple – unease, uncertainty
    "surprise": "❓",  # teal – alert, sharp, unexpected
}


POSITIVE = {"joy", "love"}
NEGATIVE = {"sadness", "anger", "fear"}
NEUTRAL  = {"surprise"}



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
    confidence: float
    lyrics: str
    color: str
    emoji: str
    mood_distribution: list[dict]
    sentiment_timeline: list[dict[str, float]]
    word_frequency: list[dict]
    stats: dict
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
    
