# BeautiQ – Sistema de Gestión de Servicios de Belleza

## 📖 Descripción del proyecto
BeautiQ es una aplicación web diseñada para la gestión de citas, usuarios y ofertas en el sector de belleza y bienestar.  
El sistema incluye un backend en Node.js y un frontend en HTML/JS, con despliegue en Render y Railway.


## ⚙️ Guía de instalación
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/BeautiQ.git
   
2. Acceder al directorio Backend:
      Bash: cd Backend

3. Instalar dependeincias:
      Bash:  cd Backend

4. Configuracion variable de entorno en un archivo .env:
      DB_HOST=localhost
      DB_USER=user
      DB_PASS=pass
      PORT=3000

5. Ejecutar el servicio en modo desarrollo:
   npm run dev



## Arquitectura general del sistema

   Frontend: interfaz de usuario (HTML, CSS, JS).

   Backend: API REST en Node.js/Express.

   Base de datos: PostgreSQL (Railway).

   CI/CD: GitHub Actions para build, lint, test y deploy.

   Despliegue: Render (backend) y Railway (base de datos).

   Contenedores: Dockerfile y docker-compose para ejecución local.
   

## Tecnologías utilizadas

   Node.js

   Express.js

   PostgreSQL

   Jest (pruebas unitarias e integración)

   Playwright (pruebas end-to-end)

   GitHub Actions (CI/CD)

   Render / Railway (despliegue)

   Docker y Docker Compose (configuración de contenedores)


## Instrucciones para ejecutar el proyecto localmente

1. Iniciar el backend:
      Bash: cd Backend
            npm install
            npm run dev

2. Ejecutar pruebas:
      Bash: npm test

3. Levantar servicios con Docker Compose:
      Bash: docker-compose up


   
