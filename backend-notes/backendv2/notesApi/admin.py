from django.contrib import admin
from .models import Note, Notebook
# Register your models here.
admin.site.register(Notebook)
admin.site.register(Note)