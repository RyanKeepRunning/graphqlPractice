import React from 'react';
import Booklist from './components/BookList';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import AddBook from './components/AddBook';
const client = new ApolloClient({
    uri: 'http://localhost:3333/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Ryan's session of graphql</h1>
        <Booklist/>
        <AddBook/>
      </div>
    </ApolloProvider>
  );
}

export default App;
