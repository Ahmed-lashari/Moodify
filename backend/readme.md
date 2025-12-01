# Moodify Backend

A FastAPI backend that predicts the mood of song lyrics using machine learning.

## 📁 Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app & API endpoints
│   ├── models.py            # Request/Response schemas
│   └── ml/
│       ├── __init__.py
│       ├── predictor.py     # ML prediction logic
│       └── model_files/
│           ├── moodify_model.pkl  # Trained classifier
│           └── tfidf.pkl          # TF-IDF vectorizer
├── requirements.txt
└── README.md
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Add Your Model Files

Place your trained models in `backend/app/ml/model_files/`:
- `moodify_model.pkl` - Your trained classifier
- `tfidf.pkl` - Your TF-IDF vectorizer

### 3. Run the Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: **http://localhost:8000**

### 4. Test the API

Visit the auto-generated docs: **http://localhost:8000/docs**

## 📡 API Endpoints

### `GET /health`
Check if the backend and models are loaded properly.

**Response:**
```json
{
  "status": "ok",
  "model_loaded": true,
  "model_error": null
}
```

### `POST /predict`
Predict mood from song lyrics.

**Request:**
```json
{
  "lyrics": "I'm walking on sunshine, feeling so alive"
}
```

**Response:**
```json
{
  "mood": "happy",
  "lyrics": "I'm walking on sunshine, feeling so alive",
  "success": true
}
```

### `GET /message`
Simple endpoint to verify backend is running.

**Response:**
```json
{
  "message": "FastAPI backend is running!",
  "description": "Your React app can fetch this anytime."
}
```

## 🔧 How It Works

1. **React sends lyrics** → `POST /predict`
2. **Backend preprocesses text:**
   - Converts to lowercase
   - Removes special characters and brackets
   - Removes extra whitespace
3. **ML Pipeline:**
   - Text → TF-IDF vectorization
   - Vector → Model prediction
4. **Backend sends mood** → React frontend

## 📦 Key Files Explained

| File | Purpose |
|------|---------|
| `main.py` | FastAPI app setup, CORS config, and endpoints |
| `models.py` | Pydantic schemas for request/response validation |
| `predictor.py` | Loads ML models and handles predictions |
| `requirements.txt` | Python dependencies |

## 🛠️ Requirements

- **Python:** 3.11+ (recommended for compatibility)
- **FastAPI:** Web framework
- **scikit-learn:** ML model support
- **uvicorn:** ASGI server

## 🔗 Connecting to React Frontend

The backend is configured with CORS to allow requests from:
- `http://localhost:3000` (React default port)

Update `app/main.py` if your React app runs on a different port:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🐛 Troubleshooting

### Models not loading?
- Verify `.pkl` files are in `backend/app/ml/model_files/`
- Check the `/health` endpoint for error messages

### CORS errors?
- Ensure React frontend URL is in `allow_origins` list
- Check that React is running on the expected port

### Import errors?
- Make sure all dependencies are installed: `pip install -r requirements.txt`
- Verify Python version: `python --version` (should be 3.11+)

## 📝 Example Usage with React

```javascript
// React component making a prediction request
const predictMood = async (lyrics) => {
  const response = await fetch('http://localhost:8000/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lyrics })
  });
  
  const data = await response.json();
  console.log(data.mood); // "happy", "sad", etc.
};
```

## 🎯 Next Steps

1. Run the backend: `uvicorn app.main:app --reload`
2. Test endpoints at: `http://localhost:8000/docs`
3. Connect your React frontend
4. Start predicting moods! 🎵

---

**Made with ❤️ for mood detection from lyrics**