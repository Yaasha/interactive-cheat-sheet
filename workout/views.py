from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Workout, Exercise, Menu, MenuItem, Progression
from django.template.defaultfilters import slugify
from .utilities import url_to_media

# Create your views here.
def index(request):
    workouts = Workout.objects.all()
    menus = Menu.objects.all()

    context = {
        'menus': menus,
        'workouts': workouts
    }

    return render(request, 'workout/index.html', context)

def show_details(request):
    exercise_id = request.GET.get('exercise_id', None)
    progression_id = request.GET.get('progression_id', None)

    exercise = Exercise.objects.get(id=exercise_id)
    progression = Progression.objects.get(id=progression_id)

    context = {
        'exercise': exercise,
        'progression': progression,
        'media': url_to_media(exercise.link)
    }

    return render(request, 'workout/card_detail.html', context)

def workout(request, name):
    wokrout = None
    for item in Workout.objects.all():
        url = slugify(item.name)
        if url == name:
            workout = item

    menus = Menu.objects.all()

    context = {
        'menus': menus,
        'workout': workout,
    }

    return render(request, 'workout/workout.html', context)