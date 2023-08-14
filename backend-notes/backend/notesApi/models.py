from django.db import models

# Create your models here.

class Notebook(models.Model):
    title = models.CharField(max_length=50)


    def __str__(self) -> str:
        return self.title

class Note(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    notebook = models.ForeignKey(Notebook, on_delete=models.CASCADE, related_name='notes')


    def __str__(self):
        return self.title
    


    
    