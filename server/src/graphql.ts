import { ApolloServer, gql } from 'apollo-server-lambda';

const schema = gql`
  type Hello {
    world: String
  }

  type Query {
    hello: Hello 
  }
`;

const resolvers = {
  Query: {
    hello: () => ({
      world: "imshaiksaif.dev"
    })
  }
}


const server = new ApolloServer({ typeDefs: schema, resolvers })

export const handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true
  }
})