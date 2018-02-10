const typeDefs = `
  type User { id: String!, email: String!, password: String! }
  type Post { id: String!, image: String! }
  type Magazine { id: String!, name: String!, cover: String! }
  type Object3D { id: String!, title: String!, description: String!, pages: Int!, marker: String!, img_marker: String!, object3d: String! }

  type Query {
    allUsers: [User]
    allPosts: [Post]
    allMagazine: [Magazine]
    allObject3D: [Object3D]
  }

  type Mutation {
    createUser ( email: String! password: String! ): User!
    updateUser ( id: String! email: String password: String ): User!
    deleteUser ( id: String! ): User!

    createPost ( image: String! ): Post!
    deletePost ( id: String! ): Post!

    createMagazine ( name: String! cover: String! ): Magazine!

    createObject3D ( mid: String! title: String! description: String! pages: Int! marker: String! img_marker: String! object3d: String! ): Object3D!
  }
`

export default typeDefs
