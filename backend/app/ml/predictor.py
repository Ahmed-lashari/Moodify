import os
import pickle
import re
from typing import Optional, Any

from sklearn.feature_extraction.text import TfidfVectorizer
import random
from scipy.sparse import spmatrix
import numpy as np
# from models import MOODS
from collections import Counter

from app.models import MOOD_COLORS, MOOD_EMOJIS, POSITIVE, NEGATIVE, NEUTRAL


class MoodPredictor:
    """
    Handles loading ML models and making mood predictions from lyrics
    """
    
    def __init__(self):
        self.model: Optional[Any] = None
        self.tfidf: Optional[TfidfVectorizer] = None  # TF-IDF vectorizer
        self.error_message: Optional[str] = None
        self._load_models()
    
    def _load_models(self):
        """Load the trained model and TF-IDF vectorizer"""
        try:
            base_dir = os.path.dirname(os.path.abspath(__file__))
            model_dir = os.path.join(base_dir, "model_files")
            
            model_path = os.path.join(model_dir, "moodify_model.pkl")
            tfidf_path = os.path.join(model_dir, "tfidf.pkl")
            
            # Check if files exist
            if not os.path.exists(model_path):
                raise FileNotFoundError(f"Model not found at {model_path}")
            if not os.path.exists(tfidf_path):
                raise FileNotFoundError(f"TF-IDF vectorizer not found at {tfidf_path}")
            
            # Load models
            with open(model_path, "rb") as f:
                self.model = pickle.load(f)

            with open(tfidf_path, "rb") as f:
                self.tfidf = pickle.load(f)
                
            print("✅ Models loaded successfully!")
            
        except Exception as e:
            self.error_message = str(e)
            print(f"❌ Error loading models: {e}")
    
    @staticmethod
    def _clean_text(text: str) -> str:
        """
        Clean and preprocess lyrics text
        (Same preprocessing used during training)
        """
        text = str(text).lower()
        text = re.sub(r"\[.*?\]", " ", text)           # remove [verse], [chorus]
        text = re.sub(r"(.)\1{2,}", r"\1\1", text)      # sooo -> soo
        text = re.sub(r"[^a-z\s]", " ", text)           # remove punctuation
        text = re.sub(r"\s+", " ", text).strip()        # remove extra spaces
        return text
    
    def predict(self, lyrics: str) -> dict:
        """
        Predict mood probabilities from raw lyrics.

        Returns:
            Dictionary {mood: probability}, sorted descending
            (highest probability is the first key)
        """
        if not self.is_loaded():
            raise RuntimeError(f"Models not loaded: {self.error_message}")

        # Preprocess lyrics
        cleaned_lyrics = self._clean_text(lyrics)

        assert self.tfidf is not None, "TF-IDF vectorizer should be loaded"
        assert self.model is not None, "Model should be loaded"

        # Transform to TF-IDF vector
        vector: spmatrix = self.tfidf.transform([cleaned_lyrics])

        # Get probabilities
        probs: np.ndarray = self.model.predict_proba(vector)[0]
        classes: np.ndarray = self.model.classes_

        # Build probability dictionary
        mood_probs = {
            str(mood): float(prob)
            for mood, prob in zip(classes, probs)
        }

        # Sort so highest probability is first (index 0 conceptually)
        mood_probs = dict(
            sorted(mood_probs.items(), key=lambda x: x[1], reverse=True)
        )
        
        

        return mood_probs

    
    
    def is_loaded(self) -> bool:
        """Check if models are loaded successfully"""
        return self.model is not None and self.tfidf is not None
    
    def get_error(self) -> Optional[str]:
        """Get error message if models failed to load"""
        return self.error_message


    def generate_data(self, lyrics: str, mood_prob: dict[str, float]) -> tuple[str,float,str,str, list[dict[str, float]], list[dict], list[dict], dict]:
        
        mood, confidence = max(mood_prob.items(), key=lambda item: item[1])
        color = MOOD_COLORS[mood]
        emoji = MOOD_EMOJIS[mood]

        words = [w for w in lyrics.strip().split() if w]

        # Mood distribution for pie chart
        mood_distribution = []
        for mood_name, mood_info in mood_prob.items():
            value = round(mood_info * 100, 2)

            mood_distribution.append({
                "name": mood_name,
                "value": value,
                "color": MOOD_COLORS[mood_name]
            })


        # Sentiment timeline
        sentiment_timeline = self.generate_sentiment_timeline(lyrics)

        # Word frequency (only words longer than 3 letters)
        filtered_words = [w.lower() for w in words if len(w) > 3]
        word_counts = Counter(filtered_words)
        word_frequency = [{"word": word, "count": count} for word, count in word_counts.most_common(10)]

        # Statistics
        stats:dict[str, float] = {
            "wordCount": len(words),
            "uniqueWords": len(set(w.lower() for w in words)),
            "avgWordLength": round(sum(len(w) for w in words) / len(words), 1) if words else 0
        }

        return mood,confidence,color, emoji, mood_distribution, sentiment_timeline, word_frequency, stats

    def generate_sentiment_timeline(self, lyrics: str) -> list[dict]:
        words = lyrics.split()
        window_size = max(5, len(words) // 10)
        timeline = []

        for i in range(0, len(words), window_size):
            chunk = " ".join(words[i:i + window_size])
            if not chunk.strip():
                continue

            # 🔁 Re-run the model on this chunk
            mood_probs = self.predict(chunk)
            mood, confidence = max(mood_probs.items(), key=lambda x: x[1])

            if mood in POSITIVE:
                sentiment = confidence * 100
            elif mood in NEGATIVE:
                sentiment = -confidence * 100
            else:
                sentiment = 0

            timeline.append({
                "line": len(timeline) + 1,
                "sentiment": round(sentiment, 2)
            })

        return timeline


