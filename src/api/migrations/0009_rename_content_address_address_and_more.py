# Generated by Django 5.1.7 on 2025-04-03 19:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_remove_address_balance_address_etherscan_data'),
    ]

    operations = [
        migrations.RenameField(
            model_name='address',
            old_name='content',
            new_name='address',
        ),
        migrations.RemoveField(
            model_name='address',
            name='etherscan_data',
        ),
    ]
