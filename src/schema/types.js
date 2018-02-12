const typeDefs = `
  type User { id: String!, email: String!, password: String! }
  type Magazine { id: String!, name: String!, cover: String!, object3d: [String] }
  type Object3D { id: String!, title: String!, description: String!, pages: Int!, marker: String!, img_marker: String!, object3d: String! }

  type Query {
    allUsers: [User]
    allMagazines: [Magazine]
  }

  type Mutation {
    createUser ( email: String! password: String! ): User!
    updateUser ( id: String! email: String password: String ): User!
    deleteUser ( id: String! ): User!

    createMagazine ( name: String! cover: String! ): Magazine!
    updateMagazine ( id: String! name: String cover: String): Magazine!
    deleteMagazine ( id: String! ): Magazine!

    createObject3D ( mid: String! title: String! description: String! pages: Int! marker: String! img_marker: String! object3d: String! ): Object3D!
  }
`

export default typeDefs
