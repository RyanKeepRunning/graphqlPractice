const graphql = require('graphql');
const {GraphQLObjectType, 
       GraphQLString,
       GraphQLSchema,
       GraphQLInt,
       GraphQLID,
       GraphQLList,
       GraphQLNonNull} = graphql;
// const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');


//Dummy data
// var books = [{name:'Name of the Wind',genre:'Fantasy',id:'1',authorId:'1'},
//              {name:'The Long Earth',genre:'Sci-Fi',id:'2',authorId:'2'}]
// var authors = [{name:'Ryan',age:27,id:'1'},
//                {name:'Hyesoo',age:23,id:'2'}]
const BookType = new GraphQLObjectType({
    name:'Book',
    fields: ()=>({ //Why this is a function? Because since it's a function that hasn't been executed, we could 
        id: {type: GraphQLID}, //use “AuthorType” although it's not defined yet.
        name:{type: GraphQLString},
        genre:{type: GraphQLString}, //foreign key not included here
        author:{
            type:AuthorType,
            resolve(parent,args){//from book to author
                // return _.find(authors,{id:parent.authorId})
                return Author.findById(parent.authorId);
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: ()=>({ 
        id: {type: GraphQLID},
        name:{type: GraphQLString},
        age:{type: GraphQLInt},
        books:{
            type:new GraphQLList(BookType), 
            resolve(parent,args){ //from author to book
                // return _.filter(books,{authorId:parent.id})
                return Book.find({authorId:parent.id})
            }
        }
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
                // return _.find(books,{id:args.id}) //What we return to the frontend
                return Book.findById(args.id);
            }
        },

        books:{
            type:GraphQLList(BookType),
            resolve(parent,args){
                return Book.find();
            }
        },

        author: {
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                // return _.find(authors,{id:args.id})
                return Author.findById(args.id);
            }
        },

        authors:{
            type: GraphQLList(AuthorType),
            resolve(parent,args){
                // return authors;
                return Author.find();
            }
        }
    }
})

const Mutation = new GraphQLObjectType({ //add delete update
    name:'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                let author = new Author({
                    name:args.name,
                    age:args.age
                });
                return author.save();
            }
        },
        addBook: {
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorId:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let book = new Book({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                });
                return book.save();
            }
        }
    }
})
 
module.exports= new GraphQLSchema({
    query:RootQuery,
    mutation: Mutation
})