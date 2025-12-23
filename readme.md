# 🎵 [Moodify](https://moodify-lyrics.vercel.app/)

**AI-Powered Lyrics Mood Analyzer**

[Moodify](https://moodify-lyrics.vercel.app/) uses machine learning and natural language processing to analyze song lyrics and predict their emotional mood. Built with FastAPI (backend) and React (frontend), it provides real-time mood predictions with beautiful visualizations.

---

## 📸 Screenshots

```
🏠 Landing Page → 📝 Input Lyrics → ⏳ Processing → 📊 Results with Charts
```

---

## ✨ Features

- 🧠 **ML-Powered Analysis** - Trained classifier predicts mood from lyrics
- 📊 **Interactive Visualizations** - Pie charts, line graphs, and bar charts
- ⚡ **Real-Time Processing** - Get results in 2-3 seconds
- 🎨 **Beautiful UI** - Modern, responsive design with Tailwind CSS
- 🔒 **Privacy-First** - Lyrics are never stored
- 📱 **Mobile Responsive** - Works on all devices

---

## 🏗️ Project Structure

```
moodify/
├── backend/                    # FastAPI backend
│   ├── app/
│   │   ├── main.py            # API endpoints & CORS
│   │   ├── models.py          # Pydantic schemas
│   │   └── ml/
│   │       ├── predictor.py   # ML prediction logic
│   │       └── model_files/
│   │           ├── moodify_model.pkl   # Trained classifier
│   │           └── tfidf.pkl           # TF-IDF vectorizer
│   ├── requirements.txt
│   └── README.md
│
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── apis/              # API calls
│   │   ├── pages/             # UI components
│   │   ├── utils/             # Config & helpers
│   │   └── App.jsx            # Main component
│   ├── package.json
│   └── README.md
│
└── README.md                   # This file
```

---

## 🚀 Quick Start

### Prerequisites

- **Python 3.11+** (for backend)
- **Node.js 16+** (for frontend)
- **pip** and **npm** installed

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Ahmed-lashari/Moodify.git
cd moodify
```

### 2️⃣ Setup Backend

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Add your trained models to backend/app/ml/model_files/
# - moodify_model.pkl
# - tfidf.pkl

# Start backend server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend runs at: **http://localhost:8000**

### 3️⃣ Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend runs at: **http://localhost:3000**

### 4️⃣ Open Your Browser

Navigate to **http://localhost:3000** and start analyzing lyrics! 🎉

---

## 🔧 Technology Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **FastAPI** | Web framework for building APIs |
| **scikit-learn** | Machine learning library |
| **Uvicorn** | ASGI server |
| **Pydantic** | Data validation |
| **Python 3.11+** | Programming language |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **Recharts** | Data visualizations |
| **Tailwind CSS** | Utility-first styling |
| **JavaScript ES6+** | Programming language |

---

## 📡 API Endpoints

### `GET /health`
Check backend and model status
```json
{
  "status": "ok",
  "model_loaded": true,
  "model_error": null
}
```

### `POST /predict`
Analyze lyrics and predict mood

**Request:**
```json
{
  "lyrics": "Walking on sunshine, feeling alive"
}
```

**Response:**
```json
{
  "mood": "happy",
  "lyrics": "Walking on sunshine, feeling alive",
  "success": true
}
```

### `GET /message`
Backend health check
```json
{
  "message": "FastAPI backend is running!",
  "description": "Your React app can fetch this anytime."
}
```

---

## 🎭 Supported Moods

| Mood | Emoji | Color | Example |
|------|-------|-------|---------|
| **Happy** | 😊 | Yellow/Orange | Upbeat, joyful lyrics |
| **Sad** | 😢 | Gray | Melancholic, sorrowful lyrics |
| **Angry** | 😠 | Red | Aggressive, intense lyrics |
| **Calm** | 😌 | Cyan/Blue | Peaceful, relaxing lyrics |
| **Energetic** | ⚡ | Orange/Pink | High-energy, motivational lyrics |
| **Romantic** | 💕 | Pink/Rose | Love songs, affectionate lyrics |

*Note: Actual moods depend on your trained model*

---

## 🔄 How It Works

```
1. User Input
   └─→ User enters lyrics on frontend

2. API Request
   └─→ React sends POST /predict to FastAPI

3. Text Preprocessing
   └─→ Clean text (lowercase, remove special chars, etc.)

4. Feature Extraction
   └─→ Convert text to TF-IDF vectors

5. ML Prediction
   └─→ Trained model predicts mood

6. Response
   └─→ Backend returns mood to frontend

7. Visualization
   └─→ React displays results with charts
```

---

## 🛠️ Development

### Backend Development

```bash
cd backend

# Run with auto-reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# View API docs
# http://localhost:8000/docs
```

### Frontend Development

```bash
cd frontend

# Development mode
npm start

# Build for production
npm run build

# Test production build
npx serve -s build
```

---

## 🧪 Testing

### Test Backend API

```bash
# Health check
curl http://localhost:8000/health

# Test prediction
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"lyrics": "I am so happy today"}'
```

### Test Frontend (Mock Mode)

Toggle **"Use Mock Data"** (top-right corner) to test UI without backend.

---

## 🌐 Environment Configuration

### Backend `.env`

```bash
# Optional: Configure frontend URL for CORS
FRONTEND_URL=http://localhost:3000
```

### Frontend `.env`

```bash
# Backend API URL
REACT_APP_API_URL=http://localhost:8000
```

---

## 📦 Deployment

### Backend (FastAPI)

```bash
# Install dependencies
pip install -r requirements.txt

# Run with gunicorn (production)
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

**Deploy to:**
- AWS EC2
- Heroku
- Railway
- DigitalOcean

### Frontend (React)

```bash
# Build production bundle
npm run build

# Deploy build/ folder
```

**Deploy to:**
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

### Important: Update CORS

When deploying, update `backend/app/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 🐛 Troubleshooting

### Backend Issues

**Models not loading?**
- Verify `.pkl` files exist in `backend/app/ml/model_files/`
- Check `/health` endpoint for error messages

**Port already in use?**
```bash
# Use different port
uvicorn app.main:app --reload --port 8001
```

### Frontend Issues

**CORS errors?**
- Ensure backend CORS allows `http://localhost:3000`
- Check backend is running before starting frontend

**API connection failed?**
- Verify backend URL in `frontend/src/apis/get.js` and `post.js`
- Check backend is accessible at `http://localhost:8000/health`

**Charts not rendering?**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git branch feature-name`
3. Commit changes: `git commit -m "Add feature"`
4. Push to branch: `git push origin feature-name`
5. Open a Pull Request

---

## 👨‍💻 Authors

**Your Name**
- GitHub: [Ahmed-lashari](https://github.com/Ahmed-lashari)
- GitHub: []()
- GitHub: []()

---

## 🙏 Acknowledgments

- **scikit-learn** - Machine learning framework
- **FastAPI** - Modern Python web framework
- **React** - UI library
- **Recharts** - Charting library
- **Tailwind CSS** - Styling framework

---

## 📚 Documentation

- [Backend Documentation](backend/README.md)
- [Frontend Documentation](frontend/README.md)
- [API Reference](http://localhost:8000/docs) (when backend is running)

---

## 🗺️ Roadmap

- [ ] Add more mood categories
<!-- - [ ] User authentication & history -->
<!-- - [ ] Spotify integration -->
- [ ] Multi-language support
- [ ] Enhanced sentiment analysis
- [ ] Export results as PDF

---

## 📧 Support

For issues and questions:
- Open an [Issue](https://github.com/Ahmed-lashari/Moodify/issues)
- Email: []

---

**Made with ❤️ and 🎵 by passionate developers**

⭐ Star this repo if you find it helpful!