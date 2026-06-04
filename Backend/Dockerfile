# Imagen base de Node.js
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando de inicio
CMD ["node", "app.js"]
