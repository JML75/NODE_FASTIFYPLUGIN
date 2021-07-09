const fastifyPlugin = require('fastify-plugin')

// connection  fastify à la base de donnée 

// https://www.fastify.io/docs/latest/Getting-Started/

async function dbConnector(fastify, options) {

    fastify.register(require('fastify-mongodb'), {
        forceClose: true,
        // force to close the mongodb connection when app stopped
        // the default value is false
        url: 'mongodb://localhost:27017/superheroes',
        // copié deousi mongodb
    })
}

module.exports = fastifyPlugin(dbConnector)