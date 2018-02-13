const typeDefs = `
  type Post { id: String!, zip_file: String! }

  type Query { allPosts: [Post] }

  type Mutation { createPost ( zip_file: String! ): Post! }
`

export default typeDefs
