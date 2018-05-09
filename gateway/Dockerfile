FROM ubuntu:18.04
MAINTAINER William Riancho <william@reptilians.io>

ENV DEBIAN_FRONTEND noninteractive

RUN set -x \
      && mkdir -p /certbot-webroot/.well-known \
      && apt-get update \
      && apt-get install --no-install-recommends --no-install-suggests -y software-properties-common \
      && add-apt-repository ppa:certbot/certbot -y \
      && apt-get update \
      && apt-get install --no-install-recommends --no-install-suggests -y nginx nginx-extras certbot \
      && ln -sf /dev/stdout /var/log/nginx/access.log \
      && ln -sf /dev/stderr /var/log/nginx/error.log

ADD ./conf /etc/nginx
ADD ./letsencrypt /etc/letsencrypt

EXPOSE 80 443

CMD ["nginx"]
