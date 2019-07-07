#!/bin/bash

cmd=$@

export NODE_ENV=${NODE_ENV:-'dev'}

export DOMAIN_PROTOCOL=${DOMAIN_PROTOCOL:-'http:'}
export DOMAIN_NAME=${DOMAIN_NAME:-'exam.co'}

export PGDB=${PGDB:-'urlshortener'}
export PGUSER=${PGUSER:-'postgres'}
export PGHOST=${PGHOST:-'postgres'}
export PGPASSWORD=${PGPASSWORD:-'1234'}

export HAPI_SERVER_HOST=${HAPI_SERVER_HOST:-'0.0.0.0'}
export HAPI_SERVER_PORT=${HAPI_SERVER_PORT:-'80'}

export ELASTICSEARCH_HOST=${ELASTICSEARCH_HOST:-'elasticsearch'}
export ELASTICSEARCH_PORT=${ELASTICSEARCH_PORT:-'9200'}

function waitfordb() {
  while true; do
    psql -c "select pg_postmaster_start_time()" >/dev/null 2>&1
    if [ $? -eq 0 ]; then
      break
    fi
    echo "Waiting to connect to Postgres..."
    sleep 5
  done
}

if [[ -z $DBLESS && "$NODE_ENV" == "dev" ]]; then
  echo "I will not proceed until $PGHOST is up. To disable this, set DBLESS to 1"
  waitfordb
fi

$cmd