'use strict';

exports.register = async function (server) {

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './server/services/frontend/angular/dist/url-shortener',
                redirectToSlash: true,
                index: true,
            }
        }
    });

};

exports.name = 'frontend';
