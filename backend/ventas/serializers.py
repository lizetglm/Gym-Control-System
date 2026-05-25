from decimal import Decimal
from django.db import transaction
from rest_framework import serializers
from .models import Venta, DetalleVenta
from productos.models import Producto

IVA_RATE = Decimal('0.16')


class ItemCarritoSerializer(serializers.Serializer):
    producto_id = serializers.IntegerField()
    cantidad    = serializers.IntegerField(min_value=1)


class VentaCreateSerializer(serializers.Serializer):
    metodo_pago = serializers.ChoiceField(
        choices=['efectivo', 'tarjeta', 'transferencia'],
        default='efectivo',
    )
    items = ItemCarritoSerializer(many=True)

    def validate_items(self, items):
        if not items:
            raise serializers.ValidationError('El carrito no puede estar vacío.')
        for item in items:
            try:
                producto = Producto.objects.get(id=item['producto_id'])
            except Producto.DoesNotExist:
                raise serializers.ValidationError(
                    f"El producto con id {item['producto_id']} no existe."
                )
            if producto.stock < item['cantidad']:
                raise serializers.ValidationError(
                    f"Stock insuficiente para '{producto.nombre}'. "
                    f"Disponible: {producto.stock}."
                )
        return items

    @transaction.atomic
    def create(self, validated_data):
        items       = validated_data['items']
        metodo_pago = validated_data['metodo_pago']

        subtotal     = Decimal('0')
        detalles_buf = []

        for item in items:
            producto      = Producto.objects.select_for_update().get(id=item['producto_id'])
            item_subtotal = producto.precio * item['cantidad']
            subtotal     += item_subtotal

            detalles_buf.append({
                'producto':        producto,
                'cantidad':        item['cantidad'],
                'precio_unitario': producto.precio,
                'subtotal':        item_subtotal,
            })
            producto.stock -= item['cantidad']
            producto.save(update_fields=['stock'])

        total = subtotal + subtotal * IVA_RATE

        venta = Venta.objects.create(total=total, metodo_pago=metodo_pago)

        for d in detalles_buf:
            DetalleVenta.objects.create(venta=venta, **d)

        return venta


class DetalleVentaSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.CharField(source='producto.nombre', read_only=True)

    class Meta:
        model  = DetalleVenta
        fields = ['id', 'producto', 'producto_nombre', 'cantidad', 'precio_unitario', 'subtotal']


class VentaSerializer(serializers.ModelSerializer):
    detalles = DetalleVentaSerializer(many=True, read_only=True)

    class Meta:
        model  = Venta
        fields = ['id', 'total', 'metodo_pago', 'fecha_venta', 'detalles']
