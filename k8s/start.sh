#!/bin/bash

gcloud config set project jeffrey-197808
gcloud config set compute/zone europe-west1-b
gcloud config set container/use_v1_api false

kubectl create secret generic api-config --from-file=config.yml=config.yml
kubectl create secret generic jeffrey-api-key --from-file=key.json=./jeffrey-api.json

kubectl apply -f redis-master-deployment.yaml
kubectl apply -f redis-master-service.yaml
kubectl apply -f api-deployment.yaml
kubectl apply -f api-service.yaml
kubectl apply -f gateway-controller.yaml
kubectl apply -f gateway-service.yaml
kubectl apply -f main-ingress.yaml


# gcloud compute addresses create api-prod --region europe-west1
