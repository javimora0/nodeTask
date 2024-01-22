

# Documentación Node.js REST API

## Despliegue
### Migraciones y seeders
```cmd
npm run s
```
Este comando inicializa la migracion de la base de datos establecida en el archivo .env y a su vez inserta datos de prueba en la tabla de usuarios y de roles.

## CRUD usuarios

### Modificar usuario
- **Method**: `PUT`
- **URL**: `http://localhost:9090/admin/132`
- **Headers**:
  - `x-token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbCI6ImFkbWluIiwiaWF0IjoxNzA1NDk5NDc2LCJleHAiOjE3MDU1MTM4NzZ9.-GkVjTQI0MsP2WhWqxjkGf8RyIkCqheb4XMu2PCtX4o`
- **Body**:
```json
{
    "nombre": "CAMBIADO2",
    "email": "root@root.com",
    "password": "root"
}
```

### Obtener usuario
- **Method**: `GET`
- **URL**: `http://localhost:9090/admin/2`
- **Headers**:
  - `x-token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbCI6ImFkbWluIiwiaWF0IjoxNzA1NjAyMjUwLCJleHAiOjE3MDU2MTY2NTB9.MIRRHtCwNvmgp8K9NaNgWDSvKw2TsMNlZ-ERRLjJxmw`
- **Body**:
```json

```

### Borrar usuario
- **Method**: `DELETE`
- **URL**: `http://localhost:9090/admin/9`
- **Headers**:
  - `x-token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbCI6ImFkbWluIiwiaWF0IjoxNzA1NDk5NDc2LCJleHAiOjE3MDU1MTM4NzZ9.-GkVjTQI0MsP2WhWqxjkGf8RyIkCqheb4XMu2PCtX4o`
- **Body**:
```json

```

### Crear usuario
- **Method**: `POST`
- **URL**: `http://localhost:9090/admin/user`
- **Headers**:
  - `x-token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbCI6ImFkbWluIiwiaWF0IjoxNzA1Nzc3NzY5LCJleHAiOjE3MDU3OTIxNjl9.C3K45lMJeK3Rgud1ni2fd4EXAsRU42wl1SuwSA77aa0`
- **Body**:
```json
{
    "email":"javier.dulcinea@gmail.com",
    "password":"asdasd",
    "nombre":"prueba",
    "rol":"admin"
}
```

### Todos usuarios
- **Method**: `GET`
- **URL**: `http://localhost:9090/admin`
- **Headers**:
  - `x-token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbCI6ImFkbWluIiwiaWF0IjoxNzA1NDk5NDc2LCJleHAiOjE3MDU1MTM4NzZ9.-GkVjTQI0MsP2WhWqxjkGf8RyIkCqheb4XMu2PCtX4o`

### Obtener roles de un usuario
- **Method**: `GET`
- **URL**: `http://localhost:9090/admin/roles/11`
- **Headers**:
  - `x-token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbCI6ImFkbWluIiwiaWF0IjoxNzA1NjA0NjQ3LCJleHAiOjE3MDU2MTkwNDd9.7K1vsX4WYrtY5ou9YcXys_T3tpTEqpqp4j8pRh9LL20`
- **Body**:
```json

```

### Asignar rol a un usuario
- **Method**: `PUT`
- **URL**: `http://localhost:9090/admin/user/rol/1`
- **Headers**:
  - `x-token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbCI6ImFkbWluIiwiaWF0IjoxNzA1NzQ1ODM2LCJleHAiOjE3MDU3NjAyMzZ9.Rxhj13AeYCgpLLD-qTjb_PjKAUpoMJsmjQhZpVQyaNw`
- **Body**:
```json
{
    "rol":"asd"
}
```

## CRUD tareas

### Obtener tarea
- **Method**: `GET`
- **URL**: `http://localhost:9090/admin/task/4`
- **Headers**:
  - `x-token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbCI6ImFkbWluIiwiaWF0IjoxNzA1NTk2MjQ4LCJleHAiOjE3MDU2MTA2NDh9.c5MU_bZuz44kaemQjDTMmRWoWnZXh_jdUZRheR6euNM`

### Obtener tareas
- **Method**: `GET`
- **URL**: `http://localhost:9090/admin/task`
- **Headers**:
  - `x-token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbCI6ImFkbWluIiwiaWF0IjoxNzA1NjU3Mjk4LCJleHAiOjE3MDU2NzE2OTh9.Waah1nfF0TR07N0WEuqqmscjhetyFBrMHwrHtZXon-A`

### Obtener tareas completadas
- **Method**: `GET`
- **URL**: `http://localhost:9090/admin/task/completadas`
- **Headers**:
  - `x-token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbCI6ImFkbWluIiwiaWF0IjoxNzA1Njc1Mzk5LCJleHAiOjE3MDU2ODk3OTl9.JSkddOx4O7FrrT0Aly16HRZ11znCHB-GKXHnu_XaIH4`

### Obtener tareas pendientes
- **Method**: `GET`
- **URL**: `http://localhost:9090/admin/task/pendientes`
- **Headers**:
  - `x-token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbCI6ImFkbWluIiwiaWF0IjoxNzA1Njc1Mzk5LCJleHAiOjE3MDU2ODk3OTl9.JSkddOx4O7FrrT0Aly16HRZ11znCHB-GKXHnu_XaIH4`

### Obtener tareas usuario
- **Method**: `GET`
- **URL**: `http://localhost:9090/admin/task/user/1`
- **Headers**:
  - `x-token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbCI6ImFkbWluIiwiaWF0IjoxNzA1Njc1Mzk5LCJleHAiOjE3MDU2ODk3OTl9.JSkddOx4O7FrrT0Aly16HRZ11znCHB-GKXHnu_XaIH4`

### Crear tarea
- **Method**: `POST`
- **URL**: `http://localhost:9090/admin/task`
- **Headers**:
  - `x-token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbCI6ImFkbWluIiwiaWF0IjoxNzA1ODM3NjcxLCJleHAiOjE3MDU4NTIwNzF9.k7RNYUQRweKF1vLb2JsAzQppXUxHu-jnf4HvbcUCKVA`
- **Body**:
```json
{
    "descripcion":"Prueba",
    "dificultad":"S",
    "horas_previstas":10,
    "horas_realizadas":9,
    "porcentaje":10,
    "completada":0,
    "id_usuario":1
}
```

### Borrar tareea
- **Method**: `DELETE`
- **URL**: `http://localhost:9090/admin/task/1`
- **Headers**:
  - `x-token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbCI6ImFkbWluIiwiaWF0IjoxNzA1NjU3Mjk4LCJleHAiOjE3MDU2NzE2OTh9.Waah1nfF0TR07N0WEuqqmscjhetyFBrMHwrHtZXon-A`

### Update tarea
- **Method**: `PUT`
- **URL**: `http://localhost:9090/admin/task/2`
- **Headers**:
  - `x-token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbCI6ImFkbWluIiwiaWF0IjoxNzA1NjU3Mjk4LCJleHAiOjE3MDU2NzE2OTh9.Waah1nfF0TR07N0WEuqqmscjhetyFBrMHwrHtZXon-A`
- **Body**:
```json
{
    "descripcion":"Prueba",
    "dificultad":"XL",
    "horas_previstas":10,
    "horas_realizadas":9,
    "porcentaje":10,
    "completada":0,
    "id_usuario":1
}
```

## Acceso y otro

### Login
- **Method**: `POST`
- **URL**: `http://localhost:9090/api/login`
- **Headers**:
  - `x-token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbCI6InByb2dyYW1hZG9yIiwiaWF0IjoxNzA1NDk5MDk0LCJleHAiOjE3MDU1MTM0OTR9.Ahp_I0KHJrwZAH-vNnQSf-5i644X8m59rdl9FR4oFuU`
- **Body**:
```json
{
    "email":"root@root.com",
    "password":"root",
    "rol":"admin"
}
```

## Tareas

### todas tareas disponibles
- **Method**: `GET`
- **URL**: `http://localhost:9090/task/disponibles`
- **Headers**:
  - `x-token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbCI6ImFkbWluIiwiaWF0IjoxNzA1Njc1Mzk5LCJleHAiOjE3MDU2ODk3OTl9.JSkddOx4O7FrrT0Aly16HRZ11znCHB-GKXHnu_XaIH4`

### tareas de un usuario
- **Method**: `GET`
- **URL**: `http://localhost:9090/task/1`
- **Headers**:
  - `x-token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbCI6ImFkbWluIiwiaWF0IjoxNzA1Njc1Mzk5LCJleHAiOjE3MDU2ODk3OTl9.JSkddOx4O7FrrT0Aly16HRZ11znCHB-GKXHnu_XaIH4`

### Asignar tarea
- **Method**: `PUT`
- **URL**: `http://localhost:9090/task/asignar/4/1`
- **Headers**:
  - `x-token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbCI6ImFkbWluIiwiaWF0IjoxNzA1Njc1Mzk5LCJleHAiOjE3MDU2ODk3OTl9.JSkddOx4O7FrrT0Aly16HRZ11znCHB-GKXHnu_XaIH4`

### Usuario modifica su propia tarea
- **Method**: `PUT`
- **URL**: `http://localhost:9090/task/4/1`
- **Headers**:
  - `x-token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbCI6ImFkbWluIiwiaWF0IjoxNzA1Njc1Mzk5LCJleHAiOjE3MDU2ODk3OTl9.JSkddOx4O7FrrT0Aly16HRZ11znCHB-GKXHnu_XaIH4`
- **Body**:
```json
{
    "porcentaje":12,
    "completada":1
}
```

## Usuario

### Cambiar contraseña
- **Method**: `PUT`
- **URL**: `http://localhost:9090/user/change_password/1`
- **Headers**:
  - `x-token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjYsInJvbCI6ImFkbWluIiwiaWF0IjoxNzA1NzcyOTU0LCJleHAiOjE3MDU3ODczNTR9.OBnih6mUpYhDxb0AP-0VhxLau8INH2-Gyv0kc-IZ8I8`
- **Body**:
```json
{
    "old_password":"pruebaprueba",
    "new_password":"root"
}
```

### Ranking usuarios
- **Method**: `GET`
- **URL**: `http://localhost:9090/user/ranking`
- **Headers**:
  - `x-token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbCI6ImFkbWluIiwiaWF0IjoxNzA1ODM4MTU3LCJleHAiOjE3MDU4NTI1NTd9.981EC1K9fySKdfTl4O90IqUJQfg9MoM7zwrnmYLEo1g`

### Solicitar contraseña
- **Method**: `POST`
- **URL**: `http://localhost:9090/user/send_password`
- **Headers**:
  - `x-token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbCI6ImFkbWluIiwiaWF0IjoxNzA1Nzc1MjcyLCJleHAiOjE3MDU3ODk2NzJ9.b6CjHYDI7YeBl_ZJ8Wv0NZDfOUeu-1MgR9EAQG-6FJg`
- **Body**:
```json
{
    "email":"javier.dulcinea@gmsdail.com"
}
```

