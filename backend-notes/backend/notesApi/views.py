from django.conf import settings
import jwt
from .utils import generate_access_token
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from .serializers import NoteSerializer, NotebookSerializer, UserLoginSerializer, UserRegistrationSerializer, UserSerializer
from .models import Note, Notebook

# Create your views here.

class NoteView(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    queryset = Note.objects.all()

class NotebooksView(viewsets.ModelViewSet):
    serializer_class = NotebookSerializer
    queryset = Notebook.objects.all()

class NoteAPIView(APIView):

    # def put(self, request)

    print()

class UserRegistrationAPIView(APIView):
    serializer_class = UserRegistrationSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def get(self, request):
        content = { 'message': 'Hello!' }
        return Response(content)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            new_user = serializer.save()
            if new_user:
                access_token = generate_access_token(new_user)
                data = { 'access_token': access_token }
                response = Response(data, status=status.HTTP_201_CREATED)
                response.set_cookie(key='access_token', value=access_token, httponly=True)
                return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserLoginAPIView(APIView):
    serializer_class = UserLoginSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def post(self, request):
        # print(request.data)
        username = request.data.get('username', None)
        user_password = request.data.get('password', None)
    
        if not user_password:
            raise AuthenticationFailed('A user password is needed.')            
        if not username:
            raise AuthenticationFailed('An username is needed.')

        user_instance = authenticate(username=username, password=user_password)
        print(user_instance, user_instance.id)
        if not user_instance:
             raise AuthenticationFailed('User not found.')
             
             
        user_access_token = generate_access_token(user_instance)
        response = Response()
        response.set_cookie(key='access_token', value=user_access_token, httponly=True)
        response.data = {
            'access_token': user_access_token
        }
        return response

        return Response({
            'message': 'Something went wrong.'
        })
    
class UserViewAPI(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def get(self, request):
        user_token = request.COOKIES.get('access_token')
        print(request.COOKIES)
        if not user_token:
            raise AuthenticationFailed('Unauthenticated user.')

        payload = jwt.decode(user_token, settings.SECRET_KEY, algorithms=['HS256'])

        user_model = get_user_model()
        user = user_model.objects.get(id=payload['user_id'])
        user_serializer = UserSerializer(user)
        return Response(user_serializer.data)
    
class UserNotebookViewAPI(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny, )
    lookup_url_kwarg = "notebook_id"

    def get(self, request):
        notebook_id = self.kwargs.get(self.lookup_url_kwarg)
    
class UserLogoutViewAPI(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def get(self, request):
        user_token = request.COOKIES.get('access_token', None)
        if user_token:
            response = Response()
            response.delete_cookie('access_token')
            response.data = {
                'message': 'Logged out successfully.'
            }
            return response
        response = Response()
        response.data = {
            'message': 'User is already logged out.'
        }
        return response