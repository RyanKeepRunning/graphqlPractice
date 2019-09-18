const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://ryan:zaq1xsw2@ds251632.mlab.com:51632/graphql-ryan',
                { useNewUrlParser: true,useUnifiedTopology: true } );
mongoose.connection.once('open',()=>{
    console.log('connected to database');
})

app.use(cors());
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
