from django.db import models
from socios.models import Socio


class Entrenador(models.Model):
    nombre       = models.CharField(max_length=150)
    especialidad = models.CharField(max_length=100)
    telefono     = models.CharField(max_length=20)

    class Meta:
        db_table            = 'entrenadores'
        ordering            = ['nombre']
        verbose_name        = 'Entrenador'
        verbose_name_plural = 'Entrenadores'

    def __str__(self):
        return self.nombre


class Clase(models.Model):
    DIA_CHOICES = [
        ('Lunes',     'Lunes'),
        ('Martes',    'Martes'),
        ('Miércoles', 'Miércoles'),
        ('Jueves',    'Jueves'),
        ('Viernes',   'Viernes'),
        ('Sábado',    'Sábado'),
        ('Domingo',   'Domingo'),
    ]
    ESTADO_CHOICES = [
        ('activa',    'Activa'),
        ('inactiva',  'Inactiva'),
        ('cancelada', 'Cancelada'),
    ]

    entrenador  = models.ForeignKey(Entrenador, on_delete=models.PROTECT, related_name='clases')
    nombre      = models.CharField(max_length=100)
    dia_semana  = models.CharField(max_length=15, choices=DIA_CHOICES)
    hora_inicio = models.TimeField()
    hora_fin    = models.TimeField()
    cupo        = models.PositiveIntegerField()
    estado      = models.CharField(max_length=15, choices=ESTADO_CHOICES, default='activa')

    class Meta:
        db_table            = 'clases'
        ordering            = ['dia_semana', 'hora_inicio']
        verbose_name        = 'Clase'
        verbose_name_plural = 'Clases'

    def __str__(self):
        return f'{self.nombre} — {self.dia_semana} {self.hora_inicio:%H:%M}'

    @property
    def alumnos_inscritos(self):
        return self.inscripciones.count()

    @property
    def lugares_disponibles(self):
        return self.cupo - self.alumnos_inscritos


class InscripcionClase(models.Model):
    socio             = models.ForeignKey(Socio, on_delete=models.CASCADE, related_name='inscripciones')
    clase             = models.ForeignKey(Clase, on_delete=models.CASCADE, related_name='inscripciones')
    fecha_inscripcion = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table            = 'inscripciones_clase'
        unique_together     = ('socio', 'clase')
        ordering            = ['-fecha_inscripcion']
        verbose_name        = 'Inscripción'
        verbose_name_plural = 'Inscripciones'

    def __str__(self):
        return f'{self.socio} → {self.clase}'
