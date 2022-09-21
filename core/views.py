from django.shortcuts import render
from .models import Task
from django.http import JsonResponse
# Create your views here.


def home(request):
    taskall = Task.objects.all()
    return  taskall.to_dict()
def create(request):
    if request.method == 'POST':
        try:
            title = request.POST.get('title')
            description = request.POST.get('description')
            task = Task(title=title, description=description)
            task.save()
            return  JsonResponse({'message': 'Task created successfully'})
        except:
            return  JsonResponse({'message': 'Error creating task'})
