from django.db import models
from markdownx.models import MarkdownxField

class Menu(models.Model):
    title = models.CharField(max_length=100, unique=True)
    link = models.CharField(max_length=250, blank=True)

    def __str__(self):
        return self.title

class MenuItem(models.Model):
    title = models.CharField(max_length=100)
    link = models.CharField(max_length=250, blank=True)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE, related_name='menu_items')

    def __str__(self):
        return self.title

class Exercise(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = MarkdownxField(blank=True)
    link = models.CharField(max_length=250, blank=True)

    def __str__(self):
        return self.name 

class ExerciseGroup(models.Model):
    title = models.CharField(max_length=100, blank=True)
    comment = models.CharField(max_length=250, blank=True)
    exercises = models.ManyToManyField(Exercise)

    def __str__(self):
        result = self.title + ' ('
        first = True
        for exercise in self.exercises.all():
            if first:
                first = False
                result += exercise.name
            else:
                result += ', ' + exercise.name
        result += ')'
        return result 

class Progression(models.Model):
    title = models.CharField(max_length=100, blank=True)
    comment = models.CharField(max_length=250, blank=True)
    description = MarkdownxField(blank=True)
    exercise_groups = models.ManyToManyField(ExerciseGroup)

    def __str__(self):
        if self.title != '':
            return self.title 
        else:    
            result = ''
            first = True
            for exercise_group in self.exercise_groups.all():
                group_name = str(exercise_group)
                group_name = (group_name[:35] + '...') if len(group_name) > 35 else group_name
                if first:
                    first = False
                    result += group_name
                else:
                    result += ', ' + group_name
            return result 

class ProgressionGroup(models.Model):
    title = models.CharField(max_length=100, blank=True)
    comment = models.CharField(max_length=250, blank=True)
    sets = models.IntegerField(blank=True)
    rest = models.IntegerField(blank=True)
    progressions = models.ManyToManyField(Progression)
    DISPLAY_CHOICES = (
        (1, 'Selects'),
        (2, 'Sections'),
    )
    display = models.IntegerField(choices=DISPLAY_CHOICES, default=1)

    def __str__(self):
        return self.title 

class Workout(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = MarkdownxField(blank=True)
    link = models.CharField(max_length=255)
    progression_groups = models.ManyToManyField(ProgressionGroup)

    def __str__(self):
        return self.name 