'use strict';

const Boom = require('@hapi/boom');
const R = require('ramda');
const Config = require('../../../config');

module.exports = async (request, h) => {
    const Search = request.server.plugins.elasticsearch.search;
    const Index = request.server.plugins.elasticsearch.index;
    const Shorthash = request.server.plugins.shorthash.generate;
    const Sequelize = request.server.plugins['hapi-sequelizejs'].urlshortener.sequelize;
    const Url = Sequelize.models.Url;
    const Payload = request.payload;
    
    let transaction, result;

    try {
        result = await Search({
            term: {
                longUrl: Payload.longUrl
            }
        });
        
        if (!result) {
            transaction = await Sequelize.transaction();
            
            result = await Url.findOne({
                where: {
                    longUrl: Payload.longUrl
                }, transaction });
            
            if (!result) {
                result = await Url.create({
                    longUrl: Payload.longUrl,
                    shortUrl: Shorthash(Payload.longUrl)
                }, { transaction });

                await transaction.commit();
            }

            await Index(R.pick(['id', 'shortUrl', 'longUrl'], result));
        }

        result.shortUrl = `${Config.get('/domain/protocol')}//${Config.get('/domain/host')}/r/${result.shortUrl}`;
        return h.response(result);
    } catch (err) {
        throw Boom.boomify(err);
    }
};
