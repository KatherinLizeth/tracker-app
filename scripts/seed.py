from core.models import Company, Project, Story, Ticket



def run():
    print("Iniciando ...")


    #limipiar tablas
    Ticket.objects.all().delete()
    Story.objects.all().delete()
    Project.objects.all().delete()
    Company.objects.all().delete()

    # ------------------------
    # 1.
    #Crear compañia
    # ------------------------
    c1 = Company.objects.create(
        name="Alpha Ltd",
        nit="900111",
        phone="300111222",
        address="Calle 1 #23-45",
        email="alpha@ex.com"
    )

    c2 = Company.objects.create(
        name="Beta S.A.",
        nit="900222",
        phone="300222333",
        address="Av 2 #56-78",
        email="beta@ex.com"
    )

    c3 = Company.objects.create(
        name="Gamma Corp",
        nit="900333",
        phone="300333444",
        address="Calle 3 #12-34",
        email="gamma@ex.com"
    )

    print("Compañías creadas.")

    # ------------------------
    # 2. Crear proyectos
    # ------------------------
    # c1 → 1 proyecto
    p1 = Project.objects.create(company=c1, name="Proyecto A", description="Sistema de inventario")

    # c2 → 2 proyectos
    p2 = Project.objects.create(company=c2, name="Proyecto B1", description="Plataforma de e-commerce")
    p3 = Project.objects.create(company=c2, name="Proyecto B2", description="Gestión de recursos")

    print("✅ Proyectos creados")

    # ------------------------
    # 3. Crear historias y tickets 
    # ------------------------

    proyectos = [p1, p2, p3]

    for proyecto in proyectos:
        for i in range(1, 4):  # 3 historias por proyecto
            story = Story.objects.create(
                project=proyecto,
                title=f"Historia {i} de {proyecto.name}",
                description=f"Descripción de la historia {i} del {proyecto.name}"
            )

             # 1 ticket ACTIVE
            Ticket.objects.create(
                story=story,
                title=f"Tarea inicial {i}",
                description="Tarea recién creada",
                comments="Pendiente asignación",
                status='ACTIVE'
            )

            # 2 tickets IN_PROGRESS
            for j in range(1, 3):
                Ticket.objects.create(
                    story=story,
                    title=f"Tarea en proceso {i}-{j}",
                    description="Tarea en desarrollo",
                    comments="Avance parcial",
                    status='IN_PROGRESS'
                )

            # 2 tickets DONE
            for k in range(1, 3):
                Ticket.objects.create(
                    story=story,
                    title=f"Tarea finalizada {i}-{k}",
                    description="Tarea completada",
                    comments="Revisión aprobada",
                    status='DONE'
                )

    print("Historias y tickets creados")
    print("¡Datos iniciales cargados con éxito.!")