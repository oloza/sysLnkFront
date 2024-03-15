# Etapa de construcción (Stage 1)
FROM node:18 as build

WORKDIR /app

# Copiar los archivos de la aplicación
COPY . .

# Instalar dependencias y construir la aplicación
RUN npm install
RUN npm run build --prod

# Etapa de producción (Stage 2)
FROM nginx:latest

# Copiar los archivos de construcción de la aplicación Angular a Nginx
COPY --from=build /app/dist/* /usr/share/nginx/html/

# Configurar Nginxb
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Exponer el puerto 80
EXPOSE 4012

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
