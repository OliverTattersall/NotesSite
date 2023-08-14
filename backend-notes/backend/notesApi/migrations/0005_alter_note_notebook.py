# Generated by Django 4.2.2 on 2023-08-13 22:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('notesApi', '0004_alter_note_notebook'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='notebook',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notes', to='notesApi.notebook'),
        ),
    ]