# Cluster AutoScaler

### Descargar manifiesto del cluster autoscaler

```
curl -o cluster-autoscaler-autodiscover.yaml https://raw.githubusercontent.com/kubernetes/autoscaler/master/cluster-autoscaler/cloudprovider/aws/examples/cluster-autoscaler-autodiscover.yaml
```

### Agregar las siguientes etiquetas al manifiesto (cluster-autoscaler-autodiscover.yaml)

```
            - --balance-similar-node-groups
            - --skip-nodes-with-system-pods=false
            - --scale-down-unneeded-time=5m
```

_No olvidar indicar el nombre del cluster dentro del yaml_

### Aplicar manifiesto

```
kubectl apply -f cluster-autoscaler-autodiscover.yaml
```
