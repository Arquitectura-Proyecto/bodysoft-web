import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: process.env.REACT_APP_GATEWAY_URL || 'http://localhost:3333/graphql', cache
});

console.log("GATEWAY URL",process.env.REACT_APP_GATEWAY_URL)

cache.writeData({  data: {
  token: localStorage.getItem("token") || '',
  type: parseInt(localStorage.getItem("type")) || 0,
  profile: !!localStorage.getItem("profile") || false
 }});

 export default client;
