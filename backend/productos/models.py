from django.db import models


class Producto(models.Model):
    CATEGORIA_CHOICES = [
        ('Suplementos', 'Suplementos'),
        ('Accesorios',  'Accesorios'),
        ('Bebidas',     'Bebidas'),
        ('Snacks',      'Snacks'),
    ]

    nombre    = models.CharField(max_length=150)
    categoria = models.CharField(max_length=20, choices=CATEGORIA_CHOICES)
    precio    = models.DecimalField(max_digits=10, decimal_places=2)
    stock     = models.PositiveIntegerField(default=0)

    class Meta:
        db_table            = 'productos'
        ordering            = ['categoria', 'nombre']
        verbose_name        = 'Producto'
        verbose_name_plural = 'Productos'

    def __str__(self):
        return f'{self.nombre} ({self.categoria})'

    @property
    def disponible(self):
        return self.stock > 0
