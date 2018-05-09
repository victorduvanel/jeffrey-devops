#!/bin/sh

set -e

# certbot certonly --noninteractive --webroot -w /certbot-webroot --agree-tos -m $LETSENCRYPT_CONTACT_EMAIL -d jffr.se

if [ ! -d /etc/letsencrypt/live ]; then
  certbot certonly --noninteractive --standalone --agree-tos -m $LETSENCRYPT_CONTACT_EMAIL \
    -d jffr.se
  certbot certonly --noninteractive --standalone --agree-tos -m $LETSENCRYPT_CONTACT_EMAIL \
    -d drone.jffr.se
fi

nginx
