from django.db import models


class Socio(models.Model):
    ESTADO_CHOICES = [
        ('activo',   'Activo'),
        ('inactivo', 'Inactivo'),
    ]

    nombre            = models.CharField(max_length=100)
    apellidos         = models.CharField(max_length=150)
    correo            = models.EmailField(unique=True)
    telefono          = models.CharField(max_length=20)
    estado            = models.CharField(max_length=10, choices=ESTADO_CHOICES, default='inactivo')
    fecha_inscripcion = models.DateField(auto_now_add=True)

    class Meta:
        db_table            = 'socios'
        ordering            = ['apellidos', 'nombre']
        verbose_name        = 'Socio'
        verbose_name_plural = 'Socios'

    def __str__(self):
        return f'{self.nombre} {self.apellidos}'


class Pago(models.Model):
    MEMBRESIA_CHOICES = [
        ('mensual',      'Mensual'),
        ('trimestral',   'Trimestral'),
        ('semestral',    'Semestral'),
        ('anual',        'Anual'),
    ]
    METODO_CHOICES = [
        ('efectivo',      'Efectivo'),
        ('tarjeta',       'Tarjeta'),
        ('transferencia', 'Transferencia'),
    ]

    socio          = models.ForeignKey(Socio, on_delete=models.PROTECT, related_name='pagos')
    tipo_membresia = models.CharField(max_length=20, choices=MEMBRESIA_CHOICES)
    monto          = models.DecimalField(max_digits=10, decimal_places=2)
    metodo_pago    = models.CharField(max_length=20, choices=METODO_CHOICES, default='efectivo')
    fecha_pago     = models.DateTimeField(auto_now_add=True)
    fecha_fin      = models.DateField()

    class Meta:
        db_table            = 'pagos'
        ordering            = ['-fecha_pago']
        verbose_name        = 'Pago'
        verbose_name_plural = 'Pagos'

    def __str__(self):
        return f'{self.socio} — {self.tipo_membresia} ({self.fecha_pago:%Y-%m-%d})'
