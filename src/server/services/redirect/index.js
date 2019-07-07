'use strict';

const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const Config = require('../../../config');

exports.register = async function (server) {

    server.route({
        method: "GET",
        path: "/r/{shortUrl}",
        options: {
            validate: {
                params: {
                    shortUrl: Joi.string().required()
                }
            }
        },
        handler: async function(request, h) {
            const Search = request.server.plugins.elasticsearch.search;
            const Sequelize = request.server.plugins['hapi-sequelizejs'].urlshortener.sequelize;
            const Url = Sequelize.models.Url;
            const Params = request.params;
            
            let result;

            try {
                result = await Search({
                    term: {
                        shortUrl: Params.shortUrl
                    }
                });
                
                if (!result) {
                    result = await Url.findOne({
                        where: {
                            shortUrl: Params.shortUrl
                        }
                    });

                    if (!result) {
                        return h.redirect(`${Config.get('/domain/protocol')}://${Config.get('/domain/host')}`);
                    }
                }

                return h.redirect(result.longUrl);
            } catch (err) {
                console.log(Boom.boomify(err));
                return h.redirect(`${Config.get('/domain/protocol')}://${Config.get('/domain/host')}`);
            }
        }
    });

};

exports.name = 'redirect';
