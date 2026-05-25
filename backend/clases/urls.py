from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EntrenadorViewSet, ClaseViewSet, InscripcionClaseViewSet

router = DefaultRouter()
router.register(r'entrenadores', EntrenadorViewSet, basename='entrenador')
router.register(r'horarios', ClaseViewSet, basename='clase')
router.register(r'inscripciones', InscripcionClaseViewSet, basename='inscripcion')

urlpatterns = [
    path('', include(router.urls)),
]