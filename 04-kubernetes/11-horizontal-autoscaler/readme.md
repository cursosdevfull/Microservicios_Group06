# Horizontal Autoscaler

### Instalar el servidor de métricas

```
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

### Verificar que esté funcionando el servidor (deployment)

```
kubectl get deployment metrics-server -n kube-system
```

### Crear un deployment y un service para pruebas

```
kubectl apply -f https://k8s.io/examples/application/php-apache.yaml
```

### Crear la regla para escalar

```
kubectl autoscale deployment php-apache --cpu-percent=50 --min=1 --max=10
```

### Listar las reglas

```
kubectl get hpa
```

### Crear carga para el deploy

```
kubectl run -i --tty load-generator --rm --image=busybox --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://php-apache; done"
```
