import json
import os
from django.core.management.base import BaseCommand
from products.models import Category, Product

class Command(BaseCommand):
    """
    Load products from a JSON file into the database.
    """
    help = 'Load products from a JSON file into the database'

    def add_arguments(self, parser):
        parser.add_argument(
            'json_file_path', 
            type=str, 
            help='The path to the JSON file containing product data'
        )

    def handle(self, *args, **kwargs):
        json_file_path = kwargs['json_file_path']

        if not os.path.exists(json_file_path):
            self.stdout.write(self.style.ERROR(f"File {json_file_path} does not exist."))
            return

        try:
            with open(json_file_path, 'r') as file:
                products_data = json.load(file)

            for product_data in products_data:
                category_name = product_data.get('Item Category ', '').strip()
                category, created = Category.objects.get_or_create(name=category_name)

                product, created = Product.objects.get_or_create(
                    name=product_data['Item Name'],
                    defaults={
                        'category': category,
                        'price': float(product_data['Item Price']),
                        'quantity': int(product_data['Quantity']),
                        'image': 'product_images/' + product_data.get('Asset Name', '')
                    }
                )

                if created:
                    self.stdout.write(self.style.SUCCESS(f"Successfully added product: {product.name}"))
                else:
                    self.stdout.write(self.style.WARNING(f"Product {product.name} already exists"))

        except json.JSONDecodeError:
            self.stdout.write(self.style.ERROR("Failed to decode JSON file."))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"An error occurred: {str(e)}"))
