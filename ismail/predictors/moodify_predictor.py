import pickle
import re

# -----------------------------
# Load trained model + TF-IDF
# -----------------------------
with open("moodify_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("tfidf.pkl", "rb") as f:
    tfidf = pickle.load(f)


# -----------------------------
# Cleaning function (same as training)
# -----------------------------
def clean_text(text: str) -> str:
    text = str(text).lower()
    text = re.sub(r"\[.*?\]", " ", text)            # remove [verse]
    text = re.sub(r"(.)\1{2,}", r"\1\1", text)       # sooo -> soo
    text = re.sub(r"[^a-z\s]", " ", text)            # punctuation
    text = re.sub(r"\s+", " ", text).strip()         # extra spaces
    return text


# -----------------------------
# Prediction function to export
# -----------------------------
def predict_mood_with_probabilities(lyrics: str) -> dict:
    """
    Takes raw lyrics as input and returns a dictionary
    of {mood: probability}.
    """

    cleaned = clean_text(lyrics)
    vector = tfidf.transform([cleaned])

    # Get probabilities
    probs = model.predict_proba(vector)[0]   # shape: (num_classes,)
    classes = model.classes_                 # mood labels

    # Convert to dictionary
    mood_probabilities = {
        mood: float(prob)
        for mood, prob in zip(classes, probs)
    }

    return mood_probabilities

