import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: process.env.GATEWAY_URL || 'http://localhost:4000/graphql', cache
});

cache.writeData({  data: {
  token: '',
  type: 0,
  profile: false
 }});

 export default client;
