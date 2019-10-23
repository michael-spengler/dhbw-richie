# Kubernetes Deploymentguide

## Installation

```
snap install microk8s --classic
```

```
microk8s.enable storage
```

```
microk8s.enable dns
```

```
microk8s.enable ingress
```

## Zertifikate

```
kubectl -n kube-system create secret tls --cert cert.pem --key priv.pem ingress-nginx-tls -n ingress --dry-run -o yaml | kubectl apply -f -
```

```
KUBE_EDITOR="nano" kubectl edit ds nginx-ingress-microk8s-controller -n ingress
```

Hier die Konfiguration überschreiben:

```
--default-ssl-certificate=default/ingress-nginx-tls
```

## Deployment

Alle .yaml mit dem folgendem Befehl ausführen.

```
kubectl apply -f dateiname
```
