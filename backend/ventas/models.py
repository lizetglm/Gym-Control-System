from django.db import models
from socios.models import Socio
from productos.models import Producto


class Venta(models.Model):
    METODO_CHOICES = [
        ('efectivo',      'Efectivo'),
        ('tarjeta',       'Tarjeta'),
        ('transferencia', 'Transferencia'),
    ]

    socio       = models.ForeignKey(
        Socio, on_delete=models.SET_NULL,
        null=True, blank=True, related_name='ventas'
    )
    total       = models.DecimalField(max_digits=12, decimal_places=2)
    metodo_pago = models.CharField(max_length=20, choices=METODO_CHOICES, default='efectivo')
    fecha_venta = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table            = 'ventas'
        ordering            = ['-fecha_venta']
        verbose_name        = 'Venta'
        verbose_name_plural = 'Ventas'

    def __str__(self):
        return f'Venta #{self.id} — ${self.total} ({self.fecha_venta:%Y-%m-%d})'


class DetalleVenta(models.Model):
    venta           = models.ForeignKey(Venta, on_delete=models.CASCADE, related_name='detalles')
    producto        = models.ForeignKey(Producto, on_delete=models.PROTECT, related_name='detalles_venta')
    cantidad        = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal        = models.DecimalField(max_digits=12, decimal_places=2)

    class Meta:
        db_table            = 'detalle_ventas'
        verbose_name        = 'Detalle de Venta'
        verbose_name_plural = 'Detalles de Venta'

    def save(self, *args, **kwargs):
        self.subtotal = self.precio_unitario * self.cantidad
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.cantidad}x {self.producto} en Venta #{self.venta_id}'
