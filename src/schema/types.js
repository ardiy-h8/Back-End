const typeDefs = `
  type User { id: String!, email: String!, password: String! }
  type Post { id: String!, image: String! }

  type Query {
    allUsers: [User]
    allPosts: [Post]
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

    createPost (image: String!): Post!
    deletePost (id: String!): Post!
  }
`

export default typeDefs
