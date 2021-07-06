// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

// cela chage le framework fastify dans la variable fastify ce qui devient un objet pour utiliser les methodes


//  API REST
// GET  - READ
// POST - CREATE
// PATCH  / PUT - UPDATE
// DELETE -DELETE

// Declare a route
fastify.get('/', (request, reply) => {
    return { hello: 'world' }
})

fastify.get('/me', function() {
    return {
        prenom: "jim",
        nom: "Quinn",
        job: "prof",
    }
})

// declarer la route heroes qui retourne un tableau
fastify.get('/heroes', function() {
    const chanteurs = ['bowie', 'jaegger', 'guilmour']
    return chanteurs
})




// Run the server!
const start = async() => {
    try {
        await fastify.listen(4000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()