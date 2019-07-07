'use strict';

const Boom = require('@hapi/boom');
const Config = require('../../../config');

module.exports = async (request, h) => {
    const Search = request.server.plugins.elasticsearch.search;
    const Sequelize = request.server.plugins['hapi-sequelizejs'].urlshortener.sequelize;
    const Url = Sequelize.models.Url;
    const Payload = request.payload;
    const Domain = Config.get('/domain');
    
    let shortUrl, urlPath, urlHost, urlProtocol, result;

    try {
        shortUrl = new URL(Payload.shortUrl); // jshint ignore:line
        urlProtocol = shortUrl.protocol;
        urlHost = shortUrl.host;
        urlPath = shortUrl.pathname.split('/')[2];

        if (urlProtocol !== Domain.protocol || urlHost !== Domain.host) {
            throw Boom.notFound(`There does not seem to be a record for: ${Payload.shortUrl}`);
        }

        result = await Search({
            term: {
                shortUrl: urlPath
            }
        });
        
        if (!result) {
            result = await Url.findOne({
                where: {
                    shortUrl: urlPath
                }
            });

            if (!result) {
                throw Boom.notFound(`There does not seem to be a record for: ${Payload.shortUrl}`);
            }
        }

        return h.response(result);
    } catch (err) {
        throw Boom.boomify(err);
    }
};
