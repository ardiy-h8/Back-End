import { Post } from '../model'
import { uploadS3 } from '../utils'

const resolvers = {
  Query: {
    allPosts: () => Post.find()
  },
  Mutation: {
    createPost: async (_, { zip_file }) => {
      const data = await uploadS3(zip_file)
      return Post.create({ zip_file: data.Location })
    }
  }
}

export default resolvers
