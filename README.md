# 🛒 Marketplace25

Aplicación web de marketplace desarrollada con Node.js, PostgreSQL y Nginx, completamente dockerizada.

## 🚀 Características

- **Backend**: Node.js con Express
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Base de datos**: PostgreSQL
- **Servidor web**: Nginx
- **Containerización**: Docker & Docker Compose

## 📋 Funcionalidades

- ✅ Sistema de autenticación (login/registro)
- ✅ Gestión de anuncios con imágenes
- ✅ Categorización de productos
- ✅ Anuncios relacionados por categoría
- ✅ Sistema de mensajería entre usuarios
- ✅ Guardar anuncios favoritos
- ✅ Búsqueda y filtros

## 🛠️ Instalación y Ejecución

### Requisitos previos
- Docker
- Docker Compose

### Pasos para ejecutar

1. **Clonar el repositorio:**
   \`\`\`bash
   git clone [URL-DEL-REPOSITORIO]
   cd Marketplace25
   \`\`\`

2. **Ejecutar con Docker:**
   \`\`\`bash
   docker-compose up -d
   \`\`\`

3. **Acceder a la aplicación:**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:3000

### Credenciales de prueba
- **Email:** erick@gmail.com
- **Password:** 123456

## 🏗️ Arquitectura

- **Frontend (Puerto 8080)**: Nginx sirviendo archivos estáticos y proxy a API
- **Backend (Puerto 3000)**: Node.js con Express
- **Base de datos (Puerto 5433)**: PostgreSQL con datos precargados

## 📁 Estructura del proyecto

\`\`\`
Marketplace25/
├── docker-compose.yml     # Orquestación de contenedores
├── Dockerfile            # Imagen del backend
├── src/
│   ├── backend/          # API Node.js
│   └── frontend/         # Archivos web estáticos
└── db/
    └── 01-market_backup.sql  # Datos iniciales
\`\`\`

## 🔧 Comandos útiles

\`\`\`bash
# Iniciar servicios
docker-compose up -d

# Ver logs
docker-compose logs

# Detener servicios
docker-compose down

# Reiniciar servicios
docker-compose restart

# Limpiar todo (incluye volúmenes)
docker-compose down -v
\`\`\`

## 👨‍💻 Desarrollo

Este proyecto fue desarrollado como parte de un sistema de marketplace completo con funcionalidades modernas y arquitectura escalable usando Docker.

## 📝 Notas

- La base de datos se inicializa automáticamente con datos de ejemplo
- Las imágenes de productos se almacenan en el contenedor backend
- El sistema está configurado para desarrollo con CORS permisivo
