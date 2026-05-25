from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SocioViewSet, PagoViewSet

# Creamos el router específico para esta app
router = DefaultRouter()
router.register(r'perfiles', SocioViewSet, basename='socio')
router.register(r'historial-pagos', PagoViewSet, basename='pago')

urlpatterns = [
    # Incluimos las rutas generadas por el router
    path('', include(router.urls)),
]