const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

/*Query behaviours:
    query a property not exist => alert with red underline, return error
    query a property value but not found => null
    data type not match => alert with red underline, return error
*/
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(3333, () => {
    console.log('now listening for requests on port 3333');
});
