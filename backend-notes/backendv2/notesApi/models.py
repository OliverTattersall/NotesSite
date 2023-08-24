from django.db import models
from django.conf import settings

# Create your models here.

class Notebook(models.Model):
    title = models.CharField(max_length=50)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notebooks')


    def __str__(self) -> str:
        return self.title

class Note(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    notebook = models.ForeignKey(Notebook, on_delete=models.CASCADE, related_name='notes')
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='note')


    def __str__(self):
        return self.title