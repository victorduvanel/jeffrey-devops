FROM ubuntu:16.04
MAINTAINER William Riancho <william@reptilians.io>

RUN set -x \
      && mkdir -p /certbot-webroot/.well-known \
      && apt-get -qq update \
      && apt-get install --no-install-recommends --no-install-suggests -y software-properties-common \
      && add-apt-repository ppa:certbot/certbot -y \
      && apt-get -qq update \
      && apt-get install --no-install-recommends --no-install-suggests -y nginx nginx-extras certbot \
      && rm -rf /var/lib/apt/lists/* \
      && ln -sf /dev/stdout /var/log/nginx/access.log \
      && ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80 443

COPY ["./conf", "/etc/nginx"]
COPY ["./start.sh", "/"]

CMD ["/start.sh"]
