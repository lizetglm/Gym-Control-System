from rest_framework import viewsets
from .models import Entrenador, Clase, InscripcionClase
from .serializers import EntrenadorSerializer, ClaseSerializer, InscripcionClaseSerializer

class EntrenadorViewSet(viewsets.ModelViewSet):
    queryset = Entrenador.objects.all()
    serializer_class = EntrenadorSerializer

class ClaseViewSet(viewsets.ModelViewSet):
    queryset = Clase.objects.all()
    serializer_class = ClaseSerializer

class InscripcionClaseViewSet(viewsets.ModelViewSet):
    queryset = InscripcionClase.objects.all()
    serializer_class = InscripcionClaseSerializer