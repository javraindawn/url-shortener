'use strict';

const Confidence = require('confidence');
const Config = require('./config');

const manifest = {
    server: Config.get('/server'),
    register: {
        plugins: [
            { plugin: '@hapi/good', options: Config.get('/logging') },
            { plugin: '@hapi/inert' },
            { plugin: './server/services/elasticsearch' },
            { plugin: './server/services/frontend' },
            { plugin: './server/services/redirect' },
            { plugin: './server/services/shorthash' },
            { plugin: './server/api', routes: { prefix: '/api/url' } }
        ]
    }
};

const store = new Confidence.Store(manifest);

exports.get = (key) => {
    return store.get(key);
};
