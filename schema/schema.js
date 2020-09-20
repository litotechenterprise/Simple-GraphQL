const graphql = require('graphql')
const _ = require('lodash')
const axios = require('axios')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID
    
} = graphql

const users = [
    {id:"1", firstName: "Pablo", age: 23},
    {id:"2", firstName: "Richie", age: 25},
    {id:"3", firstName: "Paul", age: 56},
    {id:"4", firstName: "Ted", age: 21},    
    {id:"5", firstName: "Mark", age: 10},

]


const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: {type:GraphQLString },
        firstName: {type:GraphQLString},
        age: {type: GraphQLInt}
    }
})


const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        user: {
            type: UserType,
            args: { id: {type: GraphQLString}},
            resolve(parent, args) {
                return axios.get(`http://localhost:3000/users/${args.id}`)
                .then(response => response.data)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})