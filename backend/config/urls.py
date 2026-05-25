from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/socios/',   include('socios.urls')),
    path('api/clases/',   include('clases.urls')),
    path('api/productos/', include('productos.urls')),
    path('api/ventas/',   include('ventas.urls')),
    path('api/caja/',     include('caja.urls')),
]
