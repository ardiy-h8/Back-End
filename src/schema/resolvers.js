import { User, Post } from '../model'
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
    deletePost: (_, { id }) => Post.findByIdAndRemove(id)
  }
}

export default resolvers
