# Instalación

## Prerequisitos
- Node 20.0.0
- Yarn 4.0.0
- MariaDB 11.2.2

### 1. Instalar dependencias

```bash
yarn install
```

### 2. Copiar .env.example a .env

Necesitas configurar las variables de entorno definidas en el archivo `.env.example` en un archivo `.env` en la raíz del
proyecto.
En este archivo se configura la conexión a la base de datos y el puerto en el que correrá el servidor, entre otras
cosas.

### 3. Correr migraciones

Como usamos Prisma como ORM, podemos correr nuestras migraciones y seeders de una forma sencilla corriendo el siguiente
comando:

```bash 
npx prisma migrate dev
```

<sub>Si tienes Prisma instalado de forma global puedes correrlo el comando sin usar npx</sub>

Al correr este comando te pedirá nombrar la migración, puedes nombrarla como "initial_migration".

## 4. Correr seeders

Para correr los seeders puedes correr el siguiente comando:

```bash
npx prisma db seed
```

Los seeders añadirán en la base de datos, los recursos iniciales para que la aplicación funciones. Tales como usuarios
por defectos, departamentos, municipios, etc.

Puedes verificar la creación de esto en al archivo [prisma/seed.ts](./prisma/seed.ts)

### 5. Correr el servidor

Para correr el servidor puedes correr el siguiente comando:

```bash
yarn dev
```

Ahora, yendo a tu navegador y visitando `http://localhost:3000` podrás ver la aplicación corriendo.