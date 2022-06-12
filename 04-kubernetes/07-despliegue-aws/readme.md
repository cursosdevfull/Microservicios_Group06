# Despliegue en AWS

### Herramientas a instalar

- Chocolatey (Windows)
- Brew (MAC)
- aws-cli (https://awscli.amazonaws.com/AWSCLIV2.msi)
- helm (choco install kubernetes-helm -y)
- eksctl (choco install eksctl -y)

### Configurar un usuario que acceda a AWS

```
aws configure
```

### Crear Cluster EKS

```
eksctl create cluster --name clusterms06 --without-nodegroup --region us-east-1 --zones us-east-1a,us-east-1b
```

### Agregar nodos al cluster

```
eksctl create nodegroup --cluster clusterms06 --name clusterms06-nodegroup --node-type t3.medium --nodes 1 --nodes-min 1 --nodes-max 3 --asg-access
```

### Crear IAM Provider

```
eksctl utils associate-iam-oidc-provider --cluster clusterms06 --approve
```

### Descargar política para el cluster

```
curl -o iam_policy.json https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.1.2/docs/install/iam_policy.json
```

### Crear la política

```
aws iam create-policy --policy-name AWSLoadBalancerPolicyMS06 --policy-document file://iam_policy.json
```

### Crear cuenta ServiceAccount para el cluster

```
eksctl create iamserviceaccount --cluster clusterms06 --namespace=kube-system --name=aws-lb-ms-06 --attach-policy-arn=arn:aws:iam::282865065290:policy/AWSLoadBalancerPolicyMS06 --override-existing-serviceaccounts --approve
```

### Verificar si existe el ingress controller del balanceador

```
kubectl get deploy -n kube-system alb-ingress-controller
```

### Instalar el target group binding

```
kubectl apply -k "github.com/aws/eks-charts/stable/aws-load-balancer-controller/crds?ref=master"
```

### Actualizar los repositorios de Helm

```
helm repo update
```

### Instalar el ingress controller del balanceador

```
helm upgrade -i aws-load-balancer-controller eks/aws-load-balancer-controller --set clusterName=clusterms06 --set serviceAccount.create=false --set serviceAccount.name=aws-lb-ms-06 -n kube-system
```

### Verificar que se haya instalado el ingress controller

```
kubectl get deploy -n kube-system aws-load-balancer-controller
```

### Crear repositorios para las imágenes

- Ir a ECR y crear los repositorios para cada imagen
- Usar las urls de los repositorios para crear un docker-compose-aws.yaml

### Generar las imágenes desde el docker-compose

```
docker compose -f docker-compose-aws.yaml build
```

### Vincular la cuenta de AWS con la cuenta local de Docker

```
docker login -u AWS -p $(aws ecr get-login-password --region us-east-1) 282865065290.dkr.ecr.us-east-1.amazonaws.com
```

### Para subir las imágenes locales a ECR

```
docker compose -f docker-compose-aws.yaml push
```
