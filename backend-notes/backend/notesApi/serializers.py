from rest_framework import serializers
from .models import Note

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('id', 'title', 'description')