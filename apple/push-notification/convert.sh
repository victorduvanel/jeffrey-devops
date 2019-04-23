#!/bin/sh

openssl pkcs12 -clcerts -nokeys -out apns-prod-cert.pem -in Certificates.p12
openssl pkcs12 -nocerts -out apns-prod-key.pem -in Certificates.p12
openssl rsa -in apns-prod-key.pem -out apns-prod-key-noenc.pem
