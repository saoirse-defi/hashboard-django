# Generated by Django 5.1.7 on 2025-03-25 19:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_address_balance'),
    ]

    operations = [
        migrations.AlterField(
            model_name='address',
            name='balance',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
