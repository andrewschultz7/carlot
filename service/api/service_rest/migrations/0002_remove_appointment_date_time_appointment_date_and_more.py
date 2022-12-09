# Generated by Django 4.0.3 on 2022-12-08 20:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='date_time',
        ),
        migrations.AddField(
            model_name='appointment',
            name='date',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='appointment',
            name='time',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='vin',
            field=models.CharField(max_length=17, null=True),
        ),
    ]