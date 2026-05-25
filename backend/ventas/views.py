from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Venta
from .serializers import VentaCreateSerializer, VentaSerializer


class VentaViewSet(viewsets.ModelViewSet):
    queryset           = Venta.objects.prefetch_related('detalles__producto')
    http_method_names  = ['get', 'post', 'head', 'options']

    def get_serializer_class(self):
        if self.action == 'create':
            return VentaCreateSerializer
        return VentaSerializer

    def create(self, request, *args, **kwargs):
        serializer = VentaCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        venta = serializer.save()
        return Response(VentaSerializer(venta).data, status=status.HTTP_201_CREATED)
