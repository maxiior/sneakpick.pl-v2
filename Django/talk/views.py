from rest_framework import viewsets
from rest_framework.response import Response
from .models import Question
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from core.pagination import Pagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from .serializers import QuestionSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.shortcuts import get_object_or_404
from django_filters.filters import OrderingFilter
import django_filters
from django.db.models import Count
from rest_framework.decorators import api_view, throttle_classes, permission_classes
from core.throttle import OnceADayPerURLThrottle

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def bump(request, pk):
    if request.user.is_authenticated:
        if Question.objects.filter(id=pk, bumps=request.user.id).exists():
            return Response({'Error': 'Already bumped'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            product = get_object_or_404(Question, id=pk)
            product.bumps.add(request.user)
            return Response({"total_bumps": product.bumps.count()}, status=status.HTTP_200_OK)

class QuestionFilter(django_filters.FilterSet):
    order_by_field = 'ordering'
    
    ordering = OrderingFilter(
        fields=(
            ('-published', '0'),
            ('-bumps_count', '1'),
            ('views', '2'),
        )
    )
    
    class Meta:
        model = Question
        fields = {
            'category': ["in", "exact"],
        }

class TalkViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.annotate(bumps_count=Count('bumps')).all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = QuestionSerializer
    pagination_class = Pagination
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['title', 'item']
    filter_class = QuestionFilter

@api_view(['POST'])
@throttle_classes([OnceADayPerURLThrottle])
@permission_classes([IsAuthenticated])
def incremenent_question_views(request, pk, format=None):
    product = Question.objects.get(pk=pk)
    product.views += 1
    product.save()
    return Response(status=status.HTTP_200_OK)