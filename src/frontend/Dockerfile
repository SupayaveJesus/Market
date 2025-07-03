# Usar Nginx para servir archivos estáticos
FROM nginx:alpine

# Remover la configuración por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar archivos del frontend al directorio de Nginx
COPY pages/ /usr/share/nginx/html/pages/
COPY assets/ /usr/share/nginx/html/assets/

# Copiar la página principal index.html a la raíz (versión corregida para la raíz)
COPY index-root.html /usr/share/nginx/html/index.html

# Crear configuración de Nginx personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Nginx se ejecuta automáticamente con la imagen
