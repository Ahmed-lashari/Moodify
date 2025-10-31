from django.urls import path
from .view import views

urlpatterns = [
    path('api/predict/', views.predict_mood, name='predict'),
    # path('api/health/', views.health_check, name='health_check'),
]