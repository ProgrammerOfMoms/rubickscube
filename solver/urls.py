from django.urls import path, include
from solver.views import *

urlpatterns = [
    path('', index, name='index'),
    path('shuffle/', RandomState.as_view()),
    path('solve/', Solver.as_view()),
    path('step/', TakeStep.as_view()),
    path('take_moves/', TakeMoves.as_view())
]