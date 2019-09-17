const graphql = require('graphql');
const {GraphQLObjectType, 
       GraphQLString,
       GraphQLSchema,
       GraphQLInt,
       GraphQLID} = graphql;
const _ = require('lodash');

//Dummy data
var books = [{name:'Name of the Wind',genre:'Fantasy',id:'1'},
             {name:'The Long Earth',genre:'Sci-Fi',id:'2'}]
var authors = [{name:'Ryan',age:27,id:'1'},
               {name:'Hyesoo',age:23,id:'2'}]
const BookType = new GraphQLObjectType({
    name:'Book',
    fields: ()=>({ //Why this is a function?
        id: {type: GraphQLID},
        name:{type: GraphQLString},
        genre:{type: GraphQLString}
    })
})

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: ()=>({ 
        id: {type: GraphQLID},
        name:{type: GraphQLString},
        age:{type: GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id: {type: GraphQLID}},
            resolve(parent,args){ //code to get data from db/other souce
                //parent : relationship between data
                //args : access to the id, etc
                return _.find(books,{id:args.id}) //What we return to the frontend
            }
        },
        author: {
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(authors,{id:args.id})
            }
        }
    }
})

module.exports= new GraphQLSchema({
    query:RootQuery
})