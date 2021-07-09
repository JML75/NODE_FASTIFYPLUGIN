const { ObjectId } = require('mongodb')
async function routes(fastify, options) {

    fastify.get('/heroes', async() => {
        const collection = fastify.mongo.db.collection("heroes")
        const result = await collection.find({}).toArray()
            //collection.find({}) retourne  toutes les entrées de la collection
            // collection.find({}).toArray()  convertit le retour en tableau
        return result
    })
    fastify.post('/heroes', async(request, reply) => {
        //si on va sur /heroes en POST on ajoute un nouveau hero
        // dont les données sont contenues dans request
        const collection = fastify.mongo.db.collection("heroes")
            //on se connecte à mongo DB 
        const result = await collection.insertOne(request.body)
            //on met l'action dans une variable pour regarder le resultat
            // on rajoute une entree à la collectction heroes qui est dans le body du request
        return result

        // la nouvelle entrée contenie dans le body se requuest est stockées dans la collection heroes de la base de donnée

        // async et await c'est pour rendre la fonction synchrone et ne pas recevoir une promesse

    })

    fastify.get('/heroes/:heroesId', async(request, reply) => {
        //on reçoit la requete (// /heroes/69 GET - Obtiens le héros ayant l'id 69)  du port ecouté et on le recupère graca à :heroesId


        const heroesId = request.params.heroesId

        // on peut ecrire en code déstructuré  request.params est un objet on peut le récupérer le parametre heroesId avec la syntaxe
        // const { heroesId } = request.params 


        const collection = fastify.mongo.db.collection("heroes")
            // on se connecte à la base de donnée et a la collection
            // et on fait la requête par rapport à l id recherché
        const result = await collection.findOne({
            _id: new ObjectId(heroesId)
                //ObjectID  est une classe et la requete est une chaine de caractère il faut donc creer une nouvelle instance de la classe à partir de la chaine de caractère
        })
        return result

    })

    fastify.get('/heroes/bio/:heroesId', async(request, reply) => {
        const collection = fastify.mongo.db.collection('heroes')
        const { heroesId } = request.params
        const result = await collection.findOne({
            _id: new ObjectId(heroesId)
        })

        // destrucuration 
        const { name, biography, powerstats: { intelligence, speed } } = result
        // ça remplace
        // const name = result.name
        // const biography  = result.biography
        // const intelligence = result.powersat.intelligence
        // const speed = result.powersat.speed

        // Template literals: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

        // ES6
        return `${name} connu sous le nom de ${biography["full-name"]}. Je suis née à ${biography["place-of-birth"]}. J'ai ${intelligence} en intelligence, et ${speed} en vitesse.`

        // il suffit de mettre entre  apostrophe inversée  ` `  et les variablme ${var} 

        // Version ES5 (vieux JS)
        // const name = result.name
        // const fullName = result.biography["full-name"]
        // const placeOfBirth = result.biography["full-name"]
        // const intelligence = result.powerstats.intelligence
        // const speed = result.powerstats.speed

        // return name + " connu sous le nom de " + fullName + ". Je suis née à " + placeOfBirth + ". J'ai " + intelligence + " en intelligence, et + " + speed + " en vitesse."
    })

    fastify.delete('/heroes/:heroesId', async(request, reply) => {
        const collection = fastify.mongo.db.collection('heroes')
        const { heroesId } = request.params
        const result = await collection.findOneAndDelete({
            // findOneAndDelete l'affiche avant de l'éffacer
            //deleteOne l'éfface sans l'addicher
            _id: new ObjectId(heroesId)

        })
        return result
    })

    fastify.patch('/heroes/:id', async(request, reply) => {
        const collection = fastify.mongo.db.collection('heroes')
        const { id } = request.params
        const result = await collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: request.body }, { returnDocument: 'after' }, )
        return result
    })
}

module.exports = routes