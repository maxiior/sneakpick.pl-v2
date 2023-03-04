from django.shortcuts import render
from .models import Steal, Store
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from core.pagination import Pagination
from .serializers import StealSerializer, StealStoreSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import generics
from datetime import date

class StealViewSet(viewsets.ModelViewSet):
    queryset = Steal.objects.all()
    serializer_class = StealSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = Pagination

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page, many=True)

        today = date.today()
        today_results, later_results = [], []

        for i in serializer.data:
            if i['published'][:10] == str(today):
                today_results.append(i)
            else:
                later_results.append(i)
        
        data = {
            'results': {
                'today': today_results,
                'later': later_results,
            },
            'today_count': len(today_results),
            'later_count': len(later_results)
        }

        return Response(data)

class StoreList(generics.ListAPIView):
    queryset = Store.objects.all()
    serializer_class = StealStoreSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = {'file_names': [item['file_name'] for item in serializer.data],
                'names': [item['name'] for item in serializer.data]}
        return Response(data)