from rest_framework import serializers
from .models import Note, Notebook
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model, authenticate

UserModel = get_user_model()

class MyKeywordsField(serializers.RelatedField):
    def to_representation(self, value):
        return { 'id': value.pk, 'title' : value.title }

class UserSerializer(serializers.ModelSerializer):
    # notebooks = NotebookSerializer(many=True, read_only=True)
    notebooks = MyKeywordsField(many=True, read_only=True)
    class Meta:
        model = get_user_model()
        fields = ('username', 'notebooks')

class UserRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
	def create(self, clean_data):
		print(clean_data)
		user_obj = UserModel.objects.create_user(username=clean_data['username'], password=clean_data['password'])
		user_obj.save()
		return user_obj

class UserLoginSerializer(serializers.Serializer):
	username = serializers.CharField()
	password = serializers.CharField()
	##
	def check_user(self, clean_data):
		user = authenticate(username=clean_data['username'], password=clean_data['password'])
		if not user:
			raise ValidationError('user not found')
		return user



class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('id', 'title', 'description', 'notebook')

class NotebookSerializer(serializers.ModelSerializer):
    notes = NoteSerializer(many=True, read_only=True)
    class Meta:
        model = Notebook
        fields = ('id', 'title', 'notes', 'owner')