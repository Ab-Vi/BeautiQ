# BeautiQ – Sistema de Gestión de Servicios de Belleza

## 📖 Descripción del proyecto
BeautiQ es una aplicación web diseñada para la gestión de citas, usuarios y ofertas en el sector de belleza y bienestar.  
El sistema incluye un backend en Node.js y un frontend en HTML/JS, con despliegue en Render y Railway.

---

## ⚙️ Guía de instalación
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/BeautiQ.git
   
La API está documentada con Swagger.
2. Acceso en producción:
https://beautiq-backend.onrender.com/api-docs


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
