import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tracker.settings')
django.setup()

from myapp.models import Company, Project, Story, Ticket, CustomUser

def create_sample_data():
    # Crear empresas
    company1 = Company.objects.create(
        name="Alpha Technologies",
        nit="123456789-1",
        address="Calle 123 #45-67, Bogotá",
        phone="+57-1-1234567",
        email="info@alpha.com"
    )
    
    company2 = Company.objects.create(
        name="Beta Solutions", 
        nit="987654321-1",
        address="Av. Principal #100-23, Medellín",
        phone="+57-4-7654321",
        email="contact@beta.com"
    )
    
    print("✅ Empresas creadas:", Company.objects.count())
    
    # Opcional: crear proyectos de ejemplo
    project1 = Project.objects.create(
        name="Sistema de Inventario",
        description="Sistema de gestión de inventario",
        company=company1
    )
    
    print("✅ Datos de prueba creados exitosamente!")

if __name__ == "__main__":
    create_sample_data()