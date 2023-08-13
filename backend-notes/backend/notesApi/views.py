from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Note

# Create your views here.

class NoteView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Note.objects.all()

