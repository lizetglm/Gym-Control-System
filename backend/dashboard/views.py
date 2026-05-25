from datetime import date

from django.db.models import Count, Sum
from django.db.models.functions import TruncMonth
from rest_framework.decorators import api_view
from rest_framework.response import Response

from socios.models import Socio, Pago
from clases.models import Clase, InscripcionClase
from ventas.models import Venta, DetalleVenta

MESES_ES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
            'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']


@api_view(['GET'])
def dashboard_stats(request):
    hoy = date.today()

    # ── KPIs ─────────────────────────────────────────────────────
    total_socios   = Socio.objects.count()
    ventas_mes     = Venta.objects.filter(
        fecha_venta__year=hoy.year, fecha_venta__month=hoy.month
    ).count()
    clases_activas = Clase.objects.filter(estado='activa').count()
    ingresos_ventas = Venta.objects.filter(
        fecha_venta__year=hoy.year, fecha_venta__month=hoy.month
    ).aggregate(total=Sum('total'))['total'] or 0

    ingresos_pagos  = Pago.objects.filter(
        fecha_pago__year=hoy.year, fecha_pago__month=hoy.month
    ).aggregate(total=Sum('monto'))['total'] or 0

    ingresos_mes = float(ingresos_ventas) + float(ingresos_pagos)

    # ── Productos más vendidos (top 6 por cantidad) ───────────────
    productos_qs = (
        DetalleVenta.objects
        .values('producto__nombre')
        .annotate(ventas=Sum('cantidad'))
        .order_by('-ventas')[:6]
    )
    productos_mas_vendidos = [
        {'nombre': r['producto__nombre'], 'ventas': r['ventas']}
        for r in productos_qs
    ]

    # ── Clases con más alumnos (top 5 por inscripciones) ─────────
    clases_qs = (
        InscripcionClase.objects
        .values('clase__nombre')
        .annotate(alumnos=Count('id'))
        .order_by('-alumnos')[:5]
    )
    clases_mas_alumnos = [
        {'clase': r['clase__nombre'], 'alumnos': r['alumnos']}
        for r in clases_qs
    ]

    # ── Socios inscritos por mes (año actual, todos los meses) ────
    socios_qs = (
        Socio.objects
        .filter(fecha_inscripcion__year=hoy.year)
        .annotate(mes=TruncMonth('fecha_inscripcion'))
        .values('mes')
        .annotate(cantidad=Count('id'))
        .order_by('mes')
    )
    socios_dict = {r['mes'].month: r['cantidad'] for r in socios_qs}
    socios_por_mes = [
        {'mes': MESES_ES[m - 1], 'socios': socios_dict.get(m, 0)}
        for m in range(1, 13)
    ]

    return Response({
        'kpis': {
            'total_socios':    total_socios,
            'ventas_mes':      ventas_mes,
            'clases_activas':  clases_activas,
            'ingresos_mes':    ingresos_mes,
        },
        'productos_mas_vendidos': productos_mas_vendidos,
        'clases_mas_alumnos':     clases_mas_alumnos,
        'socios_por_mes':         socios_por_mes,
    })
