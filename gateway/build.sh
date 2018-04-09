#!/bin/bash

VERSION="$(head -1 VERSION)"

docker build . -t "eu.gcr.io/jeffrey-197808/gateway:$VERSION"
