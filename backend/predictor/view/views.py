from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import joblib
import os
from django.conf import settings

# Load your ML model (adjust path as needed)
MODEL_PATH = os.path.join(settings.BASE_DIR, 'predictor', 'ml_model.pkl')

try:
    model = joblib.load(MODEL_PATH)
    print("✅ Model loaded successfully")
except Exception as e:
    print(f"⚠️  Warning: Could not load model - {e}")
    model = None


@api_view(['POST'])
def predict_mood(request):
    """
    API endpoint to predict mood from lyrics
    
    Expected request body:
    {
        "lyrics": "your song lyrics here"
    }
    
    Returns:
    {
        "mood": "Happy",
        "confidence": 0.95,
        "lyrics": "original lyrics"
    }
    """
    try:
        # Get lyrics from request
        lyrics = request.data.get('lyrics', '').strip()
        
        # Validation
        if not lyrics:
            return Response(
                {"error": "Lyrics cannot be empty"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if len(lyrics.split()) < 5:
            return Response(
                {"error": "Please provide at least 5 words"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # TODO: Add your text preprocessing here
        # processed_lyrics = preprocess_text(lyrics)
        
        # TODO: Make prediction with your model
        if model:
            # prediction = model.predict([processed_lyrics])[0]
            # confidence = model.predict_proba([processed_lyrics]).max()
            
            # Placeholder response (replace with actual prediction)
            prediction = "Happy"  # Replace with: prediction
            confidence = 0.95      # Replace with: confidence
        else:
            # Fallback if model not loaded
            prediction = "Happy"
            confidence = 0.85
        
        # Return response
        return Response({
            "mood": prediction,
            "confidence": float(confidence),
            "lyrics": lyrics
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response(
            {"error": f"Prediction failed: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def health_check(request):
    """Simple health check endpoint"""
    return Response({
        "status": "ok",
        "message": "Moodify API is running",
        "model_loaded": model is not None
    })
