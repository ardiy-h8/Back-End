import { User, Post, Magazine, Object3D } from '../model'
import { uploadS3 } from '../utils'

const resolvers = {
  Query: {
    allUsers: () => User.find(),
    allPosts: () => Post.find()
  },
  Mutation: {
    createUser: (_, args) => User.create(args),
    updateUser: (_, args) =>
      User.findByIdAndUpdate(args.id, args, { new: true }),
    deleteUser: (_, { id }) => User.findByIdAndRemove(id),
    createPost: async (_, { image }) => {
      const data = await uploadS3(image)
      const imageUrl = await Post.create({ image: data.Location })
      return imageUrl
    },
    deletePost: (_, { id }) => Post.findByIdAndRemove(id),
    createMagazine: async (_, args) => {
      const data = await uploadS3(args.cover)
      args.cover = data.Location
      return Magazine.create(args)
    },
    createObject3D: async (_, args) => {
      const marker = await uploadS3(args.marker)
      const object3d = await uploadS3(args.object3d)
      args.marker = marker.Location
      args.object3d = object3d.Location
      const objects = await Object3D.create(args)
      console.log(objects)
      await Magazine.findByIdAndUpdate(args.mid, {
        $push: { object3d: objects._id }
      })
      return objects
    }
  }
}

export default resolvers
