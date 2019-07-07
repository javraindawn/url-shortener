'use strict';

const Glue = require('@hapi/glue');
const Sequelize = require('sequelize');
const Manifest = require('./manifest');
const Config = require('./config');

const options = {
    relativeTo: __dirname
};

const startServer = async function () {
    const manifest = Manifest.get('/');

    manifest.register.plugins.push({
        plugin: 'hapi-sequelizejs',
        options: {
            name: "urlshortener",
            models: 'server/models/**/*.js',
            sequelize: new Sequelize(Config.get('/sequelize')),
            sync: true
        }
    });

    try {
        const server = await Glue.compose(manifest, options);

        await server.start();

        server.log(['server', 'info'], 'Server started at ' + server.info.uri);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startServer();
