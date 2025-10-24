from django.shortcuts import render
from django.http import HttpRequest

def index(request: HttpRequest):
    """Landing page with text input and button."""
    return render(request, 'predictor/home.html')


def result(request: HttpRequest):
    """Dashboard page after form submission."""
    if request.method == 'POST':
        user_input = request.POST.get('lyrics_input', '')
        # For now, just pass the text — later we’ll use ML model prediction
        return render(request, 'predictor/result.html', {'lyrics': user_input})
    else:
        return render(request, 'predictor/home.html')
