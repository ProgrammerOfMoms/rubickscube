from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .cube import Cube
from rubik_solver import utils


from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache

# Serve Single Page Application
index = never_cache(TemplateView.as_view(template_name='index.html'))


class RandomState(APIView):
    def post(self, request):
        iter_count = request.data['count']
        cube = Cube()
        cube.shuffle(iter_count)
        return Response(data=cube.get_json(), status=status.HTTP_200_OK)

class Solver(APIView):
    def post(self, request):
        cube_state = request.data['cube_state']
        alg = request.data['alg']
        cube = Cube()
        cube.set_state(cube_state)
        solve = utils.solve(str(cube), alg)
        res = {
            "solve": ",".join(map(str, solve))
        }
        return Response(data=res, status=status.HTTP_200_OK)

class TakeStep(APIView):
    def post(self, request):
        cube_state = request.data['cube_state']
        step = request.data['step']
        cube = Cube()
        cube.set_state(cube_state)
        cube.step(step)
        return Response(data=cube.get_json(), status=status.HTTP_200_OK)

class TakeMoves(APIView):
    def post(self, request):
        cube_state = request.data['cube_state']
        steps = request.data['moves']
        cube = Cube()
        cube.set_state(cube_state)
        for step in steps:
            cube.step(step)
        return Response(data=cube.get_json(), status=status.HTTP_200_OK)

