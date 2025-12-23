from ml.predictor import MoodPredictor





    
    
if __name__ == "__main__":
       
    predictor = MoodPredictor()
    text = ["i am very sad today but i hope to be happy soon",
        "i am extremely angry about the situation",
        "life is beautiful and makes me happy",
              "i feel so sad and lonely",
        ]

    for i in text:
      mood = predictor.predict(i)
      print(f"Lyrics: {i}\nPredicted Mood: {mood}\n")
