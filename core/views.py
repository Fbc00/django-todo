from functools import wraps

from django.contrib import auth
from django.shortcuts import render
from .models import Task
from django.http import JsonResponse, HttpResponse
import json
from django.views.decorators.csrf import csrf_exempt
# Create your views here.




@csrf_exempt
def login(request):
    username = request.POST['username']
    password = request.POST['password']
    user = auth.authenticate(username=username, password=password)
    user_dict = None
    if user is not None:
        if user.is_active:
            auth.login(request, user)
            user_dict = {
                'id': user.id,
                'name': user.get_full_name(),
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'is_authenticated': True,
            }
    return JsonResponse(user_dict, safe=False)


def ajax_login_required(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            resp = json.dumps({'not_authenticated': True})
            return HttpResponse(resp, content_type='application/json', status=401)
        return view_func(request, *args, **kwargs)
    return wrapper
@ajax_login_required
def home(request):
    taskall = Task.objects.all()
    tasklist = []
    for task in taskall:
        tasklist.append(task.to_dict())
    return JsonResponse({'task': tasklist})

@csrf_exempt
def create(request):
    if request.method == 'POST':
        try:
            valores = request.body
            post = json.loads(valores.decode('utf-8'))
            task = Task.objects.create(title=post.get('title'), description=post.get('description'))
            task.save()
            return  JsonResponse({'message': 'Task created successfully'})
        except:
            return  JsonResponse({'message': 'Error creating task'})
