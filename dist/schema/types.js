"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var typeDefs = "\n  type User { id: String!, email: String!, password: String! }\n  type Magazine { id: String!, email: String!, title: String!, imagePreviewUrl: String!, object3d: [Object3D] }\n  type Object3D { id: String!, mid: String!, title: String!, description: String!, pages: Int!, marker: String!, img_marker: String!, object3d: String! }\n\n  type Query {\n    allUsers: [User]\n    allMagazines: [Magazine]\n  }\n\n  type Mutation {\n    createUser ( email: String! password: String! ): User!\n    updateUser ( id: String! email: String password: String ): User!\n    deleteUser ( id: String! ): User!\n\n    createMagazine ( email: String! title: String! imagePreviewUrl: String! ): Magazine!\n    updateMagazine ( id: String! name: String cover: String): Magazine!\n    deleteMagazine ( id: String! ): Magazine!\n\n    createObject3D ( mid: String! title: String! description: String! pages: Int! marker: String! img_marker: String! object3d: String! ): Object3D!\n    deleteObject3D ( id: String! ): Object3D!\n  }\n";

exports.default = typeDefs;