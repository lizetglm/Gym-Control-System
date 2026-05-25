from rest_framework import serializers
from .models import Socio, Pago

class PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        fields = '__all__'

class SocioSerializer(serializers.ModelSerializer):
    # Esto incluirá el historial de pagos cuando consultes un socio individual
    pagos = PagoSerializer(many=True, read_only=True)
    estado = serializers.ReadOnlyField()

    class Meta:
        model = Socio
        fields = ['id', 'nombre', 'apellidos', 'correo', 'telefono', 'fecha_inscripcion', 'estado', 'pagos']