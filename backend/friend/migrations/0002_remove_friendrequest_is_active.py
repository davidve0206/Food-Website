# Generated by Django 4.1 on 2023-12-11 18:03

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("friend", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="friendrequest",
            name="is_active",
        ),
    ]