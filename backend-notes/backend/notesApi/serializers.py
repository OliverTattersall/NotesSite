from rest_framework import serializers
from .models import Note, Notebook
from django.contrib.auth import get_user_model

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('id', 'title', 'description', 'notebook')

class NotebookSerializer(serializers.ModelSerializer):
    notes = NoteSerializer(many=True, read_only=True)
    class Meta:
        model = Notebook
        fields = ('id', 'title', 'notes')

class MyKeywordsField(serializers.RelatedField):
    def to_representation(self, value):
        return { 'id': value.pk, 'title' : value.title }

class UserSerializer(serializers.ModelSerializer):
    # notebooks = NotebookSerializer(many=True, read_only=True)
    notebooks = MyKeywordsField(many=True, read_only=True)
    class Meta:
        model = get_user_model()
        fields = ('username', 'notebooks')

class UserLoginSerializer(serializers.Serializer):
	email = serializers.CharField(max_length=100)
	username = serializers.CharField(max_length=100)
	password = serializers.CharField(max_length=100, min_length=8, style={'input_type': 'password'})
	token = serializers.CharField(max_length=255, read_only=True)
        
class UserRegistrationSerializer(serializers.ModelSerializer):
	password = serializers.CharField(max_length=100, min_length=8, style={'input_type': 'password'})
	class Meta:
		model = get_user_model()
		fields = ['email', 'username', 'password']

	# def create(self, validated_data):
	# 	user_password = validated_data.get('password', None)
	# 	db_instance = self.Meta.model(email=validated_data.get('email'), username=validated_data.get('username'))
	# 	db_instance.set_password(user_password)
	# 	db_instance.save()
	# 	return db_instance