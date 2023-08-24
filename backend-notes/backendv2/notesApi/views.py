from django.contrib.auth import get_user_model, login, logout
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer, NoteSerializer, NotebookSerializer, UserLoginSerializer, UserSerializer
from .models import Note, Notebook
from rest_framework import permissions, status
from django.core.exceptions import ValidationError
# from .validations import custom_validation, validate_email, validate_password

class NoteView(viewsets.ModelViewSet):
	serializer_class = NoteSerializer
	queryset = Note.objects.all()

class NotebooksView(APIView):
	permission_classes = (permissions.IsAuthenticated, )
	authentication_classes = (SessionAuthentication,)
	# serializer_class = NotebookSerializer
	# queryset = Notebook.objects.all()

	def post(self, request):
		data = request.data
		
		title = data.get('title' or None)
		print(data,title, request.user.id)
		# serializer = NotebookSerializer(data)
		if title is not None:
			Notebook(title=title, owner_id=request.user.id).save()
		else:
			raise ValidationError('title needed')
		return Response({"success":"yay"})
	
	def get(self, request):
		# print(self.request.user)
		# print('hello')
		# serializer_class = NotebookSerializer
		books = [NotebookSerializer(notebook).data for notebook in Notebook.objects.all() ]
		return Response(data=books)

class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = request.data
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)


# {
# "username":"test",
# "password":"1234567890"
# }
class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		print(data)
		# assert validate_email(data)
		# assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	# permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		print('hello')
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)