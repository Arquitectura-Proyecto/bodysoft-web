import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: process.env.GATEWAY_URL || 'http://localhost:4000/graphql', cache
});

cache.writeData({  data: {
  token: localStorage.getItem("token") || '',
  type: parseInt(localStorage.getItem("type")) || 0,
  profile: !!localStorage.getItem("profile") || false
 }});

 export default client;
