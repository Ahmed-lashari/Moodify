from typing import Dict
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.models import LyricsInput, PredictionResponse, HealthResponse, MessageResponse
from app.ml.predictor import MoodPredictor

# -------------------------
# Initialize FastAPI App
# -------------------------
app = FastAPI(title="Moodify API", version="1.0.0")

# CORS Middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://moodify-lyrics.vercel.app/"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# -------------------------
# Initialize ML Predictor
# -------------------------
predictor = MoodPredictor()

# -------------------------
# API Endpoints
# -------------------------

@app.get("/health", response_model=HealthResponse)
def health_check():
    """Check if backend and model are loaded properly"""
    return {
        "status": "ok",
        "model_loaded": predictor.is_loaded(),
        "model_error": predictor.get_error()
    }


@app.post("/predict", response_model=PredictionResponse)
def predict_mood(payload: LyricsInput):
    """
    Receive lyrics from React frontend → Process → Return mood prediction
    """
    if not predictor.is_loaded():
        raise HTTPException(
            status_code=500, 
            detail=f"Model not loaded: {predictor.get_error()}"
        )
    
    text = payload.lyrics.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Lyrics cannot be empty")
    
    try:
        mood_prob: Dict[str, float] = predictor.predict(text)
        # Generate mock data for the rest
        mood, confidence,color, emoji, mood_distribution, sentiment_timeline, word_frequency, stats = predictor.generate_data(text, mood_prob)

        return {
            "mood": mood,
            "confidence": confidence,
            "lyrics": text,
            "color": color,
            "emoji": emoji,
            "mood_distribution": mood_distribution,
            "sentiment_timeline": sentiment_timeline,
            "word_frequency": word_frequency,
            "stats": stats,
            "success": True
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


@app.get("/message", response_model=MessageResponse)
def send_message():
    """
    Simple endpoint to verify backend is running
    """
    return {
        "message": "FastAPI backend is running!",
        "description": "Your React app can fetch this anytime."
    }