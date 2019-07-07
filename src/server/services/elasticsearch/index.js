'use strict';

const Elasticsearch = require('@elastic/elasticsearch');
const Boom = require('@hapi/boom');
const R = require('ramda');
const Config = require('../../../config');
const Client = new Elasticsearch.Client({ node: `http://elasticsearch:${Config.get('/elasticsearch/port')}` });

exports.register = async function (server) {

    try {
        await Client.indices.create({
            index: 'url-shortener',
            body: {
                mappings: {
                    properties: {
                        id: { type: 'keyword' },
                        shortUrl: { type: 'keyword' },
                        longUrl: { type: 'keyword' }
                    }
                }
            }
        });
    } catch (err) {
        if (err && err.meta && err.meta.body && err.meta.body.error.type === 'resource_already_exists_exception') {
            console.log('====================================================');
            console.log('Index: \'url-shortener\' already exists. Proceeding...');
            console.log('====================================================');    
        } else {
            console.log('==================================================================');
            console.log('Waiting 15 secs. for elasticsearch service to be up and running...');
            console.log('==================================================================');

            await new Promise(resolve => setTimeout(resolve, 15000));

            throw Boom.boomify(err);
        }
    }

    const index = async function(data) {
        let result;
        try {
            result = await Client.index({
                index: 'url-shortener',
                refresh: true,
                body: {
                    id: data.id,
                    shortUrl: data.shortUrl,
                    longUrl: data.longUrl
                }
            });

            return result;
        } catch (err) {
            throw Boom.boomify(err, {
                statusCode: err.meta.body.status,
                message: `${err.meta.body.error.reason}`
            });
        }
    };

    const search = async function(query) {
        let result;
        try {
            result = await Client.search({
                index: 'url-shortener',
                body: {
                    query: query
                }
            });

            if (result.body.hits.hits.length > 0) {
                return query.term ? result.body.hits.hits[0]._source : R.map(h => h._source, result.body.hits.hits);
            }

            return false;
        } catch (err) {
            if (err && err.meta && err.meta.body && err.meta.body.status === 404) {
                return false;
            } else {
                throw Boom.boomify(err, {
                    statusCode: err.meta.body.status,
                    message: `${err.meta.body.error.reason}`
                });
            }
        }
    };

    server.expose('index', index);
    server.expose('search', search);
};

exports.name = 'elasticsearch';
