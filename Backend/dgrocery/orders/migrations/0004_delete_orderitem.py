# Generated by Django 4.2.16 on 2024-09-30 03:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_alter_cartitem_product'),
    ]

    operations = [
        migrations.DeleteModel(
            name='OrderItem',
        ),
    ]
