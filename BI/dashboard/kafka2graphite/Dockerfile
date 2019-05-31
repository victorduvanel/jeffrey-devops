FROM ubuntu:18.04
MAINTAINER William Riancho <william@reptilians.io>

ARG NODE_VERSION=v12.2.0

RUN apt-get update
RUN apt-get install -y \
  curl xz-utils gnupg2

RUN curl -OL https://nodejs.org/dist/$NODE_VERSION/node-$NODE_VERSION-linux-x64.tar.xz
RUN tar -xJf node-$NODE_VERSION-linux-x64.tar.xz --strip-components=1 -C /usr/local
RUN rm node-$NODE_VERSION-linux-x64.tar.xz

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update
RUN apt-get install -y --no-install-recommends \
  yarn

WORKDIR /app
ADD package.json yarn.lock ./
RUN yarn install

ADD . .

ENV PORT 80
EXPOSE 80
CMD npm start
