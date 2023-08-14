from rest_framework import serializers
from .models import Note, Notebook

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('id', 'title', 'description')

class NotebookSerializer(serializers.ModelSerializer):
    # notes = serializers.StringRelatedField(
    #     many=True,
    #     read_only=True
    # )
    notes = NoteSerializer(many=True, read_only=True)
    class Meta:
        model = Notebook
        fields = ('id', 'title', 'notes')