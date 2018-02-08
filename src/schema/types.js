const typeDefs = `
  type User { id: String!, email: String!, password: String! }

  type Query {
    allUsers: [User]
  }

  type Mutation {
    createUser (
      email: String!
      password: String!
    ): User!

    updateUser (
      id: String!
      email: String
      password: String
    ): User!

    deleteUser (
      id: String!
    ): User!
  }
`

export default typeDefs
