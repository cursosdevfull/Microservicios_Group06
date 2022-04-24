# Dockerfile

### Para crear una imagen desde un Dockerfile

```
docker build -t image-orders-ms .
```

### Para crear el contenedor

```
docker run -d --name orders-ms image-orders-ms
```

### Para ver logs dentro de un contenedor

```
docker logs orders-ms
```

### Para conectarnos a un contenedor

```
docker exec -it orders-ms sh
```

### Para crear una red bridge

```
docker network create red-ms -d bridge
```

### Para conectar contenedores a una red

```
docker network connect red-ms mongo-server
```

### Para saber qué contenedores están dentro de una red

```
docker network inspect red-ms
```

### Crear el contenedor usando variables de entorno

```
docker run -d --name orders-ms -e MONGO_HOST=mongo-server -e RABBIT_HOST=rabbitmq:5672 --network red-ms image-orders-ms
```
