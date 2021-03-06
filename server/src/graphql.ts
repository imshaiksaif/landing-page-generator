import { ApolloServer, gql } from 'apollo-server-lambda';
import { updateUser, createPage } from "./mutations";
import { allPages, page } from './queries';

const schema = gql`
  type User {
    userId: String
    createdAt: String
    lastSignedInAt: String
  }

  type LandingPage {
    userId: String
    pageId: String
    createdAt: String
    lastUpdatedAt: String
    pageName: String
    content: String
  }


  type Query {
    allPages: [LandingPage]
    page(userId: String, pageId: String): LandingPage 
  }

  type Mutation {
    updateUser(userId: String): User
    createPage(userId: String, pageName: String): LandingPage
  }
`;

const resolvers = {
  Query: {
    allPages,
    page
  },
  Mutation: {
    updateUser,
    createPage
  }
}


const server = new ApolloServer({ typeDefs: schema, resolvers })

export const handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true
  }
})