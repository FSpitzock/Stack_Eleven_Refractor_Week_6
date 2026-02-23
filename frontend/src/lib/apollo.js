import pkg from '@apollo/client';
const { ApolloClient, InMemoryCache, createHttpLink } = pkg;
import { setContext } from '@apollo/client/link/context';

// Create HTTP link for GraphQL
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

// Add JWT auth header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('hh:token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Initialize client
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
