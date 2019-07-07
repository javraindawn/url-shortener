'use strict';

const Joi = require('joi');

exports.register = async function (server) {

    server.route({
        method: "POST",
        path: "/inflate",
        options: {
            validate: {
                payload: {
                    shortUrl: Joi.string().uri().regex(/[^ ]*\/r\/[^ ]*/)
                }
            }
        },
        handler: require('./actions/post-inflate')
    });

    server.route({
        method: "POST",
        path: "/shorten",
        options: {
            validate: {
                payload: {
                    longUrl: Joi.string().uri()
                }
            }
        },
        handler: require('./actions/post-shorten')
    });

};

exports.name = 'url-api';
