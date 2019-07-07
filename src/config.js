'use strict';

const Confidence = require('confidence');

const config = {

    domain: {
        protocol: { $env: "DOMAIN_PROTOCOL" },
        host: { $env: "DOMAIN_NAME" }
    },

    server: {
        debug: {
            log: ['error'],
            request: ['error']
        },
        host: { $env: "HAPI_SERVER_HOST" },
        port: { $env: "HAPI_SERVER_PORT" }
    },

    logging: {
        ops: {
            interval: 1000
        },
        reporters: {
            console: [
                {
                    module: '@hapi/good-squeeze',
                    name: 'Squeeze',
                    args: [{ log: '*', response: '*' }]
                },
                {
                    module: '@hapi/good-console'
                },
                'stdout'
            ]
        }
    },

    sequelize: {
        database: { $env: "PGDB" },
        username: { $env: "PGUSER" },
        password: { $env: "PGPASSWORD" },
        host: { $env: "PGHOST" },
        dialect: 'postgres'
    },

    elasticsearch: {
        host: { $env: "ELASTICSEARCH_HOST"},
        port: { $env: "ELASTICSEARCH_PORT"}
    }
};

const store = new Confidence.Store(config);

exports.get = (key) => {
  return store.get(key);
};