import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  onError: (e) => { console.log(e) },
});

const getClient = (token) => {
  return new ApolloClient({
   uri: 'http://localhost:4000/',
   request: (operation) => {
     if(token) {
       operation.setContext({
         headers: {
           "Authorization": `Bearer ${token}`
         }
       })
     }
   },
   onError: (e) => { console.log(e) },
 });
}

module.exports = {client, getClient}