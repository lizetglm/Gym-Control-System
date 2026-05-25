from django.db import models


class MovimientoCaja(models.Model):
    TIPO_CHOICES = [
        ('ingreso', 'Ingreso'),
        ('egreso',  'Egreso'),
    ]

    tipo       = models.CharField(max_length=10, choices=TIPO_CHOICES)
    concepto   = models.CharField(max_length=200)
    monto      = models.DecimalField(max_digits=12, decimal_places=2)
    fecha      = models.DateTimeField(auto_now_add=True)
    referencia = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        db_table            = 'movimientos_caja'
        ordering            = ['-fecha']
        verbose_name        = 'Movimiento de Caja'
        verbose_name_plural = 'Movimientos de Caja'

    def __str__(self):
        return f'{self.get_tipo_display()} — ${self.monto} ({self.concepto})'
