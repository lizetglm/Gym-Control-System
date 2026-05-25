from django.contrib import admin

# Register your models here.
# Agregar al admin.py de socios para que puedas gestionar los modelos desde el panel de administración de Django. Aquí tienes un ejemplo básico de cómo registrar los modelos Socio y Pago:
from .models import Socio, Pago
@admin.register(Socio)
class SocioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'apellidos', 'correo', 'telefono',)
    search_fields = ('nombre', 'apellidos', 'correo')

@admin.register(Pago)
class PagoAdmin(admin.ModelAdmin):
    list_display = ('socio', 'tipo_membresia', 'monto', 'metodo_pago', 'fecha_pago')
    list_filter = ('tipo_membresia', 'metodo_pago', 'fecha_pago')
    search_fields = ('socio__nombre', 'socio__apellidos', 'socio__correo')
