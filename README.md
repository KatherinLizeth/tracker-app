# Sistema de Gestión de Proyectos y Tickets

Sistema web completo para gestión de proyectos, historias de usuario y tickets de desarrollo.

## Características del proyecto

- **Autenticación de usuarios** con registro y login
- **Gestión de compañías** con información completa
- **Control de proyectos** organizados por compañía
- **Historias de usuario** asociadas a proyectos
- **Sistema de tickets** con seguimiento de estados
- **Interfaz responsive** que funciona en desktop y móviles

## Tecnologías Utilizadas

### Frontend
- Angular 12+
- TypeScript
- HTML5 & CSS3/SCSS
- RxJS para manejo de estados
- Servicios HTTP para APIs

### Backend
- Django 4+
- Django REST Framework
- PostgreSQL/MySQL/SQLite
- Simple JWT para autenticación

## Instalación y Configuración

### Prerrequisitos
- Node.js 14+
- Angular CLI 12+
- Python 3.8+
- Pipenv o virtualenv

### Frontend (Angular)
```bash
# Clonar el repositorio
git clone <https://github.com/KatherinLizeth/tracker-app.git>
cd proyecto-frontend

# Instalar dependencias
npm install

# Servidor de desarrollo
ng serve


BACKEND DJANGO
cd proyecto-backend

# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# o
venv\Scripts\activate     # Windows

# Instalar dependencias
pip install -r requirements.txt

# Migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Ejecutar servidor
python manage.py runserver

FRONTEND ENVIROMENTS
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',
};

export const environmentProd = {
  production: true,
  apiUrl: 'https://tubackend.railway.app/api',
};

COMANDOS ÚTILES
# Frontend
ng serve
ng build --prod
ng test

# Backend
python manage.py runserver
python manage.py makemigrations
python manage.py migrate

SCRIPT DE DATOS PARA PRUEBA
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tracker.settings')
django.setup()

from django.contrib.auth import get_user_model
from myapp.models import Company, Project, Story, Ticket

def create_sample_data():
    # Crear compañías
    company1 = Company.objects.create(
        name="Alpha Technologies",
        nit="123456789-1",
        address="Calle 123 #45-67",
        phone="+57-1-1234567",
        email="info@alpha.com"
    )
    
    company2 = Company.objects.create(
        name="Beta Solutions",
        nit="987654321-1", 
        address="Av. Principal #100-23",
        phone="+57-1-7654321",
        email="contact@beta.com"
    )
    
    # Crear proyectos
    project1 = Project.objects.create(
        name="Sistema de Inventario",
        description="Sistema de gestión de inventario para Alpha",
        company=company1
    )
    
    project2 = Project.objects.create(
        name="E-commerce Platform",
        description="Plataforma de comercio electrónico",
        company=company2
    )
    
    print("Datos de prueba creados exitosamente!")

if __name__ == "__main__":
    create_sample_data()