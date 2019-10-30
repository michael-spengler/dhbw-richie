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
kubectl -n ingress create secret tls --cert cert.pem --key priv.pem ingress-nginx-tls --dry-run -o yaml | kubectl apply -f -
```

```
KUBE_EDITOR="nano" kubectl edit ds nginx-ingress-microk8s-controller -n ingress
```

Hier die Konfiguration überschreiben:

```
--default-ssl-certificate=default/ingress-nginx-tls
```

## Deployment

Die Datei "backend.yaml" muss noch um die folgenden Umgebungsvariablen erweitert werden:

- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- GOOGLE_CALLBACK_URL
- FRONTEND_CALLBACK
- JWT_EXPIRES_IN
- JWT_SECRET

Alle .yaml mit dem folgendem Befehl ausführen.

```
kubectl apply -f dateiname
```
