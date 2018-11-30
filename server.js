'use strict';

const hapi = require('hapi');
const azure = require('azure-storage');
const dotEnv = require('dotenv').config();

// const tableService = azure.createTableService();
const config = {
    port: process.env.PORT || 3000,
    host: process.env.HOST || "localhost",
    routes: { cors: true }
};

const server = new hapi.Server(config);

const init = async () => {
    await server.start();
    console.log('Im sort of working!');
};

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
        return 200;
    }
});

process.on('unhandledRejection', (err) => {
    console.log(err);
});

init();