# Rabbitmq en un contenedor

### Descargar imagen de Rabbitmq (management)

```
docker pull rabbitmq:3-management-alpine
```

### Crear un contenedor de Mongo

```
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management-alpine
```

### Para acceder a la consola de Rabbitmq

_Managment:_ http://localhost:15672
_user:_ guest
_pass:_ guest

### Para eliminar un contenedor

```
docker rm -f rabbitmq
```
