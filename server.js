const hapi = require('hapi');
const azure = require('azure-storage');
const dotEnv = require('dotenv').config();
const tableService = azure.createTableService(process.env.CUSTOMCONNSTR_cosmosTables);

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

server.route({
    method: 'GET',
    path: '/dogs',
    handler: function (request, h) {
        
        const query = new azure.TableQuery()
            .where("PartitionKey eq 'dogs'");
            
        let promise = new Promise((res, rej) => {

            tableService.queryEntities('state', query, null, (err, result, response) => {
                if (err) {
                    rej(err);
                }

                resolve(result);
            })
        });

        return promise;
    }
});


process.on('unhandledRejection', (err) => {
    console.log(err);
});

init();