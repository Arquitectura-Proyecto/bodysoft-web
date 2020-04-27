import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache()

export const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql', cache
});

cache.writeData({  data: {
  token: "",
  isLogged: false,
  type: 0,
  profile: false
 }});
