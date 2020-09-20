const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')

const app = express()

app.use('/graphql', graphqlHTTP({
    graphiql:true,
    schema:schema
}))

const PORT = 8080

app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
})
