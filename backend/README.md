# Backend Digital Health

Este proyecto es un backend en Node.js con Express y PostgreSQL para gestionar pacientes.

## Requisitos

Antes de empezar, asegúrate de tener instalados:

- Node.js 18 o superior
- npm
- PostgreSQL
- opcionalmente: pgAdmin o psql

## 1. Instalar dependencias

Desde la carpeta del proyecto ejecuta:

```bash
npm install
```

## 2. Configurar la base de datos

1. Crea una base de datos en PostgreSQL.
2. Crea un usuario y asigna una contraseña.
3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=digitalhealth
PORT=3000
```

> Puedes cambiar los valores según tu configuración local.

## 3. Restaurar el respaldo de la base de datos

En la raíz del proyecto existe un archivo de respaldo llamado `dump-postgres-202607141739.sql`.

Para cargarlo en tu base de datos, puedes ejecutar:

```bash
pg_restore --username=postgres --dbname=digitalhealth --clean --if-exists dump-postgres-202607141739.sql
```

Si prefieres usar PowerShell en Windows, el comando sería algo como:

```powershell
pg_restore.exe -U postgres -d digitalhealth --clean --if-exists .\dump-postgres-202607141739.sql
```

Si tu entorno no tiene `pg_restore`, puedes usar `psql` dependiendo del tipo de respaldo que tengas.

## 4. Correr el programa

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

O de forma normal:

```bash
npm start
```

Por defecto el servidor correrá en:

```text
http://localhost:3000
```

## 5. Probar que funciona

Puedes verificar que el backend responde en:

```text
http://localhost:3000/test
```

También expone rutas bajo:

```text
/api/patients
```

## 6. Cargar datos sintéticos desde DBeaver

Si deseas poblar la base de datos con información de prueba, puedes hacerlo directamente desde DBeaver ejecutando consultas SQL sobre la base de datos conectada.

### Pasos

1. Abre DBeaver y conecta PostgreSQL a la base de datos creada.
2. Abre una nueva consulta SQL.
3. Ejecuta sentencias `INSERT` en la tabla `patients`.

### Ejemplo de carga de datos sintéticos

```sql
INSERT INTO patients (
  nombre,
  document,
  fechanacimiento,
  telefono,
  eps,
  prioridad,
  estado,
  tipo_documento,
  eps_codigo,
  genero
) VALUES
(
  'Ana Gómez',
  '1010101010',
  '1990-05-14',
  '3001112233',
  'Sura',
  'Alta',
  'Activo',
  'CC',
  'EPS001',
  'Femenino'
),
(
  'Carlos Pérez',
  '2020202020',
  '1985-08-21',
  '3002223344',
  'Nueva EPS',
  'Media',
  'Activo',
  'CC',
  'EPS002',
  'Masculino'
),
(
  'María López',
  '3030303030',
  '1998-12-03',
  '3003334455',
  'Sanitas',
  'Baja',
  'Inactivo',
  'TI',
  'EPS003',
  'Femenino'
);
```

### Nota importante

- Asegúrate de que la tabla `patients` exista en la base de datos.
- Si la tabla está vacía, los `INSERT` funcionarán correctamente.
- Puedes repetir la consulta con distintos valores para agregar más registros.

## 7. Sesión de ejemplo de las rutas

Una vez el servidor esté corriendo, puedes probar estas rutas con Postman, Insomnia o curl.

### Obtener todos los pacientes

```http
GET http://localhost:3000/api/patients
```

### Obtener un paciente por ID

```http
GET http://localhost:3000/api/patients/1
```

### Crear un paciente

```http
POST http://localhost:3000/api/patients
Content-Type: application/json
```

```json
{
  "nombre": "Laura Torres",
  "document": "1234567890",
  "fechanacimiento": "1992-03-10",
  "telefono": "3001234567",
  "eps": "Sura",
  "prioridad": "Alta",
  "estado": "Activo",
  "tipo_documento": "CC",
  "eps_codigo": "EPS004",
  "genero": "Femenino"
}
```

### Actualizar un paciente

```http
PUT http://localhost:3000/api/patients/1
Content-Type: application/json
```

```json
{
  "nombre": "Laura Torres Actualizada",
  "estado": "Inactivo"
}
```

### Eliminar un paciente

```http
DELETE http://localhost:3000/api/patients/1
```

## Estructura general

- `src/app.js`: configuración de Express
- `src/server.js`: inicio del servidor
- `src/routes/`: rutas de la API
- `src/controller/`: controladores
- `src/services/`: lógica de negocio
- `src/repository/`: acceso a datos
- `src/config/db.js`: conexión con PostgreSQL

Si quieres, también puedo dejarte un archivo `.env.example` para que el proyecto sea aún más fácil de configurar.

## Diagrama de la base de datos

El backend consulta y manipula principalmente la tabla `patients`. El siguiente diagrama muestra su estructura conceptual:

```mermaid
erDiagram
    PATIENTS {
        int id PK
        string nombre
        string document
        date fechanacimiento
        string telefono
        string eps
        string prioridad
        string estado
        string tipo_documento
        string eps_codigo
        string genero
    }
```

> Este diagrama está basado en los campos usados por la API en el repositorio actual.
>
> <img width="437" height="331" alt="image" src="https://github.com/user-attachments/assets/143c2508-822f-4bd0-b875-80a1d61a3706" />

