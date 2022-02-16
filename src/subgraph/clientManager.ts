import { ApolloClient, DefaultOptions, InMemoryCache } from '@apollo/client';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

export const client = new ApolloClient({
  uri: 'http://13.250.204.172:8080/v1/graphql',
  cache: new InMemoryCache(),
  defaultOptions,
  headers: {
    'x-hasura-admin-secret': 'hyYE3it4jW7V43Ez',
  },
});
