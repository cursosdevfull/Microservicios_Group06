# Mongo en un contenedor

### Descargar imagen de Mongo

```
docker pull mongo:bionic
```

### Crear un volumen nombrado

```
docker volume create mongo-persist
```

### Crear un contenedor de Mongo

```
docker run -d --name mongo-server -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root -p 27017:27017 -v mongo-persist:/data/db mongo:bionic
```

### Para listar el contenedor

```
docker ps
```
