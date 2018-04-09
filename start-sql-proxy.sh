#!/bin/sh

./cloud_sql_proxy -instances=jeffrey-197808:europe-west1:api-production=tcp:3399 -credential_file=./sql-client.json
