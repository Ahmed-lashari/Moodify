import os
import pickle
import re
from typing import Optional, Any

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.base import ClassifierMixin
from scipy.sparse import spmatrix
import numpy as np

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
    
    def predict(self, lyrics: str) -> str:
        """
        Predict mood from raw lyrics
        
        Args:
            lyrics: Raw song lyrics

        Returns:
            Predicted mood (e.g., "happy", "sad", "angry")
        """
        if not self.is_loaded():
            raise RuntimeError(f"Models not loaded: {self.error_message}")
        
        # Preprocess lyrics
        cleaned_lyrics = self._clean_text(lyrics)
        
        # Type assertion to help Pylance understand these won't be None here
        assert self.tfidf is not None, "TF-IDF vectorizer should be loaded"
        assert self.model is not None, "Model should be loaded"
        
        # Transform to TF-IDF vector
        # Returns: scipy.sparse.csr_matrix of shape (n_samples, n_features)
        vector: spmatrix = self.tfidf.transform([cleaned_lyrics])
        
        # Predict mood
        # Returns: numpy.ndarray of shape (n_samples,)
        prediction: np.ndarray = self.model.predict(vector)
        
        # Extract first element
        mood: str = str(prediction[0])
        
        return mood
    
    
    def is_loaded(self) -> bool:
        """Check if models are loaded successfully"""
        return self.model is not None and self.tfidf is not None
    
    def get_error(self) -> Optional[str]:
        """Get error message if models failed to load"""
        return self.error_message