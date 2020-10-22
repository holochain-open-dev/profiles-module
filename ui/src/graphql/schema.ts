import { gql } from '@apollo/client/core';

export const profilesUsernameTypeDefs = gql`
  type Agent {
    id: ID!

    profile: Profile
  }

  extend type Query {
    allAgents: [Agent!]!
    me: Agent!
  }

  extend type Mutation {
    createProfile(username: String!): Agent!
  }

  type Profile {
    username: String!
  }
`;