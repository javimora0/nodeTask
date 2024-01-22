Tareas Node API
Esta documentación describe las rutas y operaciones disponibles en la API Tareas Node. A continuación, se detallan las distintas secciones según las funcionalidades ofrecidas.

CRUD Usuarios
Modificar Usuario
Método: PUT
URL: http://localhost:9090/admin/{usuario_id}
Headers:
x-token: Token de autenticación JWT
Body:
json
Copy code
{
    "nombre": "CAMBIADO2",
    "email": "root@root.com",
    "password": "root"
}
Respuesta: Sin contenido
Obtener Usuario
Método: GET
URL: http://localhost:9090/admin/{usuario_id}
Headers:
x-token: Token de autenticación JWT
Respuesta: Sin contenido
Borrar Usuario
Método: DELETE
URL: http://localhost:9090/admin/{usuario_id}
Headers:
x-token: Token de autenticación JWT
Respuesta: Sin contenido
Crear Usuario
Método: POST
URL: http://localhost:9090/admin/user
Headers:
x-token: Token de autenticación JWT
Body:
json
Copy code
{
    "email": "javier.dulcinea@gmail.com",
    "password": "asdasd",
    "nombre": "prueba",
    "rol": "admin"
}
Respuesta: Sin contenido
Todos los Usuarios
Método: GET
URL: http://localhost:9090/admin
Headers:
x-token: Token de autenticación JWT
Respuesta: Sin contenido
Obtener Roles de un Usuario
Método: GET
URL: http://localhost:9090/admin/roles/{usuario_id}
Headers:
x-token: Token de autenticación JWT
Respuesta: Sin contenido
Asignar Rol a un Usuario
Método: PUT
URL: http://localhost:9090/admin/user/rol/{usuario_id}
Headers:
x-token: Token de autenticación JWT
Body:
json
Copy code
{
    "rol": "asd"
}
Respuesta: Sin contenido
CRUD Tareas
Obtener Tarea
Método: GET
URL: http://localhost:9090/admin/task/{tarea_id}
Headers:
x-token: Token de autenticación JWT
Respuesta: Sin contenido
Obtener Tareas
Método: GET
URL: http://localhost:9090/admin/task
Headers:
x-token: Token de autenticación JWT
Respuesta: Sin contenido
Obtener Tareas Completadas
Método: GET
URL: http://localhost:9090/admin/task/completadas
Headers:
x-token: Token de autenticación JWT
Respuesta: Sin contenido
Obtener Tareas Pendientes
Método: GET
URL: http://localhost:9090/admin/task/pendientes
Headers:
x-token: Token de autenticación JWT
Respuesta: Sin contenido
Obtener Tareas de un Usuario
Método: GET
URL: http://localhost:9090/admin/task/user/{usuario_id}
Headers:
x-token: Token de autenticación JWT
Respuesta: Sin contenido
Crear Tarea
Método: POST
URL: http://localhost:9090/admin/task
Headers:
x-token: Token de autenticación JWT
Body:
json
Copy code
{
    "descripcion": "Prueba",
    "dificultad": "S",
    "horas_previstas": 10,
    "horas_realizadas": 9,
    "porcentaje": 10,
    "completada": 0,
    "id_usuario": 1
}
Respuesta: Sin contenido
Borrar Tarea
Método: DELETE
URL: http://localhost:9090/admin/task/{tarea_id}
Headers:
x-token: Token de autenticación JWT
Respuesta: Sin contenido
Actualizar Tarea
Método: PUT
URL: http://localhost:9090/admin/task/{tarea_id}
Headers:
x-token: Token de autenticación JWT
Body:
json
Copy code
{
    "descripcion": "Cambiada",
    "dificultad": "S",
    "horas_previstas": 10,
    "horas_realizadas": 9,
    "porcentaje": 10,
    "completada": 0,
    "id_usuario": 1
}
Respuesta: Sin contenido
Gestión de Sesiones
Iniciar Sesión
Método: POST
URL: http://localhost:9090/admin/login
Body:
json
Copy code
{
    "email": "javier.dulcinea@gmail.com",
    "password": "asdasd"
}
Respuesta:
json
Copy code
{
    "token": "JWT_TOKEN"
}
Cerrar Sesión
Método: POST
URL: http://localhost:9090/admin/logout
Headers:
x-token: Token de autenticación JWT
Respuesta: Sin contenido
Gestión de Errores
En caso de error, la API devolverá una respuesta con el correspondiente código de error y un mensaje descriptivo.

Ejemplo:

json
Copy code
{
    "error": true,
    "message": "Usuario no autorizado"
}
