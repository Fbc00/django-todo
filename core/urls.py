from django.urls import path
from . import views

urlpatterns = [
     path('api/tasklist', views.home, name="home"),
     path('api/taskcreate', views.create, name="create"),
     path('api/login', views.login, name="login"),
]