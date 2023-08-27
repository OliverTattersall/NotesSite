from django.urls import path, include
from . import views
from rest_framework import routers


router = routers.DefaultRouter()
# router.register(r'notes', views.NoteView, 'note')
# router.register(r'notebooks', views.NotebooksView, 'notebook')

urlpatterns = [
	path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),
    path('notebooks/', views.NotebooksView.as_view(), name='notebook'),
    path('notebook/<id>/', views.NotebookView.as_view(), name='notebook'),
    path('note/', views.NoteView.as_view(), name='note'),
    path('', include(router.urls))
]