const { ObjectId } = require('mongodb')
async function routes(fastify, options) {

    fastify.post('/users', async(request, reply) => {
        const collection = fastify.mongo.db.collection("users")

        try {
            const collection = fastify.mongo.db.collection("users")
            const { prenom, nom, password, email, role, adresse } = request.body
            const long = password.length
            const userExist = await collection.findOne({ email })
            if (userExist !== null) {
                throw new Error('cet email est déjà pris')
            }

            if (password.length < 5) {
                console.log(password.length)
                    // throw new Error("Mot de passe trop court - au moins 3 caractères")
                return createError.NotAcceptable('Mot de passe trop court - au moins 3 caractères')
            }

            const hash = await argon2.hash(password)
            const newuser = request.body
            newuser.password = hash
            const result = await collection.insertOne(newuser)
            return result.ops

        } catch (err) {
            console.error(err)
                // reply.code(409).send({
                //     error: true,
                //     message: err.message
                // })

            // avec le module createError
            // return createError(409, err.message) ou 
            return createError.Conflict(err.message)
        }
    })



    fastify.get('/users', async(request, reply) => {
        const collection = fastify.mongo.db.collection("users")
        const result = await collection.find({}).toArray()
        return result
    })

    // authentification
    // on recupére l'email et le password dans request
    // on cherche si lutilsiateur possede un email
    //s'il existe on vérifie que les password correspondent
    // sinon on genere une erreur



    // Si l'utilisateur ne m'envoie pas de token, je dois lui retourner une erreur
    // Sinon, je lui retourne un objet contenant la propriété message avec Bienvenue comme valeur

    fastify.get('/users/:id', async(request, reply) => {
        const collection = fastify.mongo.db.collection('users')
        console.log(request.params)
        const result = await collection.findOne({
            _id: new ObjectId(id)
        })
        return result.adresse
    })


    fastify.delete('/users/:id', async(request, reply) => {
        const collection = fastify.mongo.db.collection('users')
        const { id } = request.params
        const result = await collection.findOneAndDelete({
            _id: new ObjectId(id)
        }, { returnDocument: 'after' })
        return result
    })


    fastify.patch('/users/:id', async(request, reply) => {
        const collection = fastify.mongo.db.collection('users')
        const { id } = request.params
        const result = await collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: request.body }, { returnDocument: 'after' })
        return result
    })

}

module.exports = routes