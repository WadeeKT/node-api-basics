const express = require('express')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = process.env.PORT || 3000


app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json()) // for parsing application/json
    .use(cors())

sequelize.initDb()

app.get('/', (req, res) => res.json('Hello Heroku ! 🚀'))

// We add the routes.
require('./src/routes/findAllPokemons')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

// We add the management of 404 errors.
app.use(({res}) => {
    const message = 'Unable to find the requested resource. You can try on another URL.'
    res.status(404).json({message})
})


app.listen(port, () => console.log(`Our Node app is started on http://localhost:${port}`))

// Coded by Sanna Thomas (https://github.com/wadeekt) 😊