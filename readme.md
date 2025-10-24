# Moodify - Predict Song Mood from Lyrics

**Moodify** is a web-based application built using Django that predicts the mood of a song based on its lyrics.  
It applies text processing and machine learning techniques to classify songs into categories such as *Happy*, *Sad*, *Energetic*, or *Chill*.  
The project demonstrates end-to-end text preprocessing, supervised learning, and dimensionality reduction using PCA.

---

## Project Overview

### Key Features
- Accepts song lyrics input through a user interface.
- Predicts song mood using a pre-trained machine learning model (stored as a `.pkl` file).
- Provides a responsive frontend built with HTML, CSS, and JavaScript.
- Displays prediction results and related insights on a secondary route.
- Designed with modular Django architecture for scalability and maintainability.

### Technology Stack
| Component | Technology |
|------------|-------------|
| Framework | Django (Python 3.10+) |
| Frontend | HTML, CSS, JavaScript |
| Machine Learning | Scikit-learn, NLTK, NumPy, Pandas |
| Model | Logistic Regression / Naive Bayes / SVM |
| Dimensionality Reduction | PCA |
| Deployment | (To be added: Vercel / GitHub Actions / Render) |

---

## Project Structure

```
moodify/
├── manage.py
├── requirements.txt
├── db.sqlite3
├── moodify/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
└── predictor/
    ├── models.py
    ├── views.py
    ├── urls.py
    ├── admin.py
    ├── apps.py
    ├── templates/
    │   └── predictor/
    │       ├── home.html
    │       └── result.html
    ├── static/
    │   └── predictor/
    │       ├── css/
    │       │   └── styles.css
    │       └── js/
    │           └── script.js
    ├── migrations/
    └── model_files/
        └── trained_model.pkl
```

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/moodify.git
cd moodify
```

### 2. Create and Activate a Virtual Environment

**For macOS/Linux**
```bash
python3 -m venv venv
source venv/bin/activate
```

**For Windows**
```bash
python -m venv venv
venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Apply Migrations
```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

### 5. Run the Development Server
```bash
python3 manage.py runserver
```

Access the application at:
```
http://127.0.0.1:8000/
```

---

## Directory Overview

| File or Folder | Description |
|----------------|-------------|
| `predictor/views.py` | Contains logic for request handling and rendering templates. |
| `predictor/templates/predictor/` | Holds HTML templates for UI rendering. |
| `predictor/static/predictor/` | Contains static assets such as CSS and JS. |
| `predictor/model_files/` | Stores pre-trained machine learning model files. |
| `requirements.txt` | Lists all Python dependencies. |
| `manage.py` | Django’s project management and execution script. |

---

## Deployment

This section will include deployment instructions for Vercel, Render, or GitHub Actions in the future.

---

## Future Improvements
- Integration of data visualization dashboards using Matplotlib or Plotly.
- Lyric fetching through external APIs (e.g., Genius API).
- Fine-tuning of mood prediction with transformer-based NLP models.
- Addition of user authentication and history tracking features.

