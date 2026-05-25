from rest_framework import serializers
from .models import Entrenador, Clase, InscripcionClase

class EntrenadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entrenador
        fields = '__all__'

class ClaseSerializer(serializers.ModelSerializer):
    # Mapeamos 'entrenador' al campo 'instructor' que espera Clases.jsx
    instructor = serializers.ReadOnlyField(source='entrenador.nombre')
    inscritos = serializers.ReadOnlyField(source='alumnos_inscritos')
    horario = serializers.SerializerMethodField()

    class Meta:
        model = Clase
        fields = ['id', 'nombre', 'instructor', 'horario', 'cupo', 'inscritos', 'estado']

    def get_horario(self, obj):
        # Transforma el día y horas en la cadena de texto que tu tabla de React renderiza
        return f"{obj.dia_semana} {obj.hora_inicio.strftime('%H:%M')} - {obj.hora_fin.strftime('%H:%M')}"

class InscripcionClaseSerializer(serializers.ModelSerializer):
    socioNombre = serializers.SerializerMethodField()
    socioEmail  = serializers.SerializerMethodField()
    claseNombre = serializers.ReadOnlyField(source='clase.nombre')

    class Meta:
        model  = InscripcionClase
        fields = ['id', 'socio', 'clase', 'claseNombre', 'fecha_inscripcion', 'socioNombre', 'socioEmail']

    def get_socioNombre(self, obj):
        return f"{obj.socio.nombre} {obj.socio.apellidos}"

    def get_socioEmail(self, obj):
        return obj.socio.correo