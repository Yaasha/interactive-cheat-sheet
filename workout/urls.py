from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<name>/', views.workout, name='workout'),
    path('ajax/show_details', views.show_details, name='ajax'),
]