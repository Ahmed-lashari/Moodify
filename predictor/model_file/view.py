# predictor/views.py
import os, json, joblib
from django.shortcuts import render
from django.http import JsonResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "predictor", "model_files", "trained_model.pkl")

model = None
_model_load_error = None
if os.path.exists(MODEL_PATH):
    try:
        model = joblib.load(MODEL_PATH)
    except Exception as e:
        _model_load_error = str(e)
else:
    _model_load_error = f"Model not found at {MODEL_PATH}"

def index(request: HttpRequest):
    return render(request, "predictor/home.html")

def result(request: HttpRequest):
    if request.method == "POST":
        user_input = request.POST.get("lyrics_input", "")
        prediction = ""
        if model is not None:
            try:
                prediction = model.predict([user_input])[0]
            except Exception:
                prediction = ""
        return render(request, "predictor/result.html", {"lyrics": user_input, "prediction": prediction})
    return render(request, "predictor/home.html")

def api_health(request: HttpRequest):
    return JsonResponse({
        "status": "ok",
        "model_loaded": model is not None,
        "model_error": _model_load_error
    })

@csrf_exempt
def api_predict(request: HttpRequest):
    if request.method != "POST":
        return JsonResponse({"detail": "Method not allowed. Use POST."}, status=405)
    if model is None:
        return JsonResponse({"error": "Model not loaded", "model_error": _model_load_error}, status=500)
    try:
        body_text = request.body.decode("utf-8") or "{}"
        payload = json.loads(body_text)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON body"}, status=400)
    lyrics = payload.get("lyrics", "")
    if not isinstance(lyrics, str) or lyrics.strip() == "":
        return JsonResponse({"error": "Please provide non-empty 'lyrics' string in JSON body."}, status=400)
    try:
        pred = model.predict([lyrics])
        mood = pred[0] if len(pred) > 0 else ""
    except Exception as e:
        return JsonResponse({"error": "Prediction failed", "detail": str(e)}, status=500)
    return JsonResponse({"mood": mood, "lyrics": lyrics})
