// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })


// connection  fastify à la base de donnée 
fastify.register(require('fastify-mongodb'), {
    // force to close the mongodb connection when app stopped
    // the default value is false
    forceClose: true,

    url: 'mongodb://localhost:27017/superheroes'

})

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
        job: "developpeur WEB",
    }
})

// declarer la route heroes qui retourne un tableau
// si on va sur ma route /heroes en get on consulte 
fastify.get('/heroes', function() {
    const chanteurs = ['bowie', 'jaegger', 'guilmour']
    return chanteurs
})



//si on va sur /heroes en POST on ajoute un nouveau chanteur

fastify.post('/heroes', (request, reply) => {
    const collection = fastify.mongo.db.collection("heroes")
    collection.insertOne(request.body)
    return null
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