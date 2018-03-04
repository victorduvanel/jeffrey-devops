FROM ubuntu:16.04

MAINTAINER William Riancho <william@reptilians.io>

# certbot certonly --webroot -w /certbot-webroot -d jeffrey.reptilians.io

RUN set -x \
      && mkdir -p /certbot-webroot/.well-known \
      && apt-get -qq update \
      && apt-get install --no-install-recommends --no-install-suggests -y software-properties-common \
      && add-apt-repository ppa:certbot/certbot -y \
      && apt-get -qq update \
      && apt-get install --no-install-recommends --no-install-suggests -y nginx nginx-extras python-certbot-nginx \
    
