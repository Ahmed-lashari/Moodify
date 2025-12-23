from ml.predictor import MoodPredictor

if __name__ == "__main__":
       
    predictor = MoodPredictor()
    text = [
           "I keep smiling around people, but inside everything feels heavy and slow.",
           "Nothing terrible happened today, yet I can’t shake this dull sense of emptiness.",
           "finally got what I wanted, and instead of joy I just feel… tired.",
           "They apologized, and I said it was fine, but my chest is still tight with resentment.",
           
           "The sun was out, the music was loud, and for a moment I forgot how anxious I’ve been.",
           "’m laughing at the joke, but part of me wants to scream.",
           "Everything is calm right now, which somehow makes me more nervous",
           "I don’t hate them, I’m just deeply disappointed.",
           "should be grateful, and that thought alone makes me feel worse.",
           "feel hopeful about tomorrow, even though today hurt more than I expected.",
        ]

    for i in text:
      mood = predictor.predict(i)
      print(f"Lyrics: {i}\nPredicted Mood: {mood}\n")
