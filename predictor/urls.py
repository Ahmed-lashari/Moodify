from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('result/', views.result, name='result'),

   
    path('api/health/', views.api_health, name='api_health'),
    path('api/predict/', views.api_predict, name='api_predict'),
]
