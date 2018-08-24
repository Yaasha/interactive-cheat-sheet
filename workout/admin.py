from django.contrib import admin
from .models import Workout, ProgressionGroup, Progression, ExerciseGroup, Exercise, Menu, MenuItem

admin.site.register(Workout)
admin.site.register(ProgressionGroup)
admin.site.register(Progression)
admin.site.register(ExerciseGroup)
admin.site.register(Exercise)
admin.site.register(Menu)
admin.site.register(MenuItem)
