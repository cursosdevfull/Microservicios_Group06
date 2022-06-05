# Contextos

### Ver el contexto actual

```
kubectl config current-context
```

### Listar todos los contextos

```
kubectl config view
```

### Crear un contexto

```
kubectl config set-context ctx-stg --cluster=sergio --user=hidalgo
```

### Cambiar de contexto

```
kubectl config use-context ctx-stg
```
