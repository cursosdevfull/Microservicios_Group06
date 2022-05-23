# PODS

### Comandos básicos

```
kubectl run server --image=nginx:alpine
kubectl get pods
kubectl get po
kubectl port-forward <nombre pod> <puerto host>:<puerto contenedor>
kubectl get po <nombre pod>
kubectl get po <nombre pod> -o yaml
kubectl get po <nombre pod> -o json
kubectl describe po <nombre pod>
kubectl apply -f <nombre manifiesto>
kubectl delete <nombre pod>
kubectl delete -f <nombre manifiesto>
kubectl exec -it <nombre pod> -- sh
kubectl exec -it <nombre pod> -c <nombre contenedor> -- sh
```
