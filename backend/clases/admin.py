from django.contrib import admin

# Register your models here.
# Agregar al admin.py de socios para que puedas gestionar los modelos desde el panel de administración de Django. Aquí tienes un ejemplo básico de cómo registrar los modelos Socio y Pago:
from .models import Entrenador, Clase, InscripcionClase

@admin.register(Entrenador)
class EntrenadorAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'especialidad', 'telefono')
    search_fields = ('nombre', 'especialidad')

@admin.register(Clase)
class ClaseAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'entrenador', 'dia_semana', 'hora_inicio', 'hora_fin', 'cupo', 'estado')
    list_filter = ('dia_semana', 'estado')
    search_fields = ('nombre', 'entrenador__nombre')

@admin.register(InscripcionClase)
class InscripcionClaseAdmin(admin.ModelAdmin):
    list_display = ('socio', 'clase', 'fecha_inscripcion')
    list_filter = ('fecha_inscripcion',)
    search_fields = ('socio__nombre', 'clase__nombre')

