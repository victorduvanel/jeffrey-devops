#!/bin/sh

VERSION="$(head -1 VERSION)"

docker build . -t "registry.gitlab.com/jeffrey-services/kafka2graphite:$VERSION"
