#!/bin/bash

gcloud config set project jeffrey-197808
gcloud config set compute/zone europe-west1-b
gcloud config set container/use_v1_api false

kubectl create secret generic jeffrey-api-config --from-file=config.yml=./config/jeffrey-config.yml
kubectl create secret generic jeffrey-api-key --from-file=key.json=./config/jeffrey-api.json

kubectl create secret generic elchaouch-api-config --from-file=config.yml=./config/elchaouch-config.yml
kubectl create secret generic elchaouch-api-key --from-file=key.json=./config/jeffrey-api.json

kubectl create secret generic forest-api-key --from-file=key.json=./config/forest-api.json

kubectl apply -f redis-master-deployment.yaml
kubectl apply -f redis-master-service.yaml
kubectl apply -f jeffrey.yaml
kubectl apply -f gateway.yaml
kubectl apply -f main-ingress.yaml


# gcloud compute addresses create api-prod --region europe-west1
