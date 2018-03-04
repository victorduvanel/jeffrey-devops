#!/bin/sh

set -e

if [ ! -d /etc/letsencrypt/live ]; then
  certbot certonly --noninteractive --standalone --agree-tos -m $LETSENCRYPT_CONTACT_EMAIL \
    -d stage.jeffrey-services.com
fi

nginx
