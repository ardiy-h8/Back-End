import { User } from '../model'
// import { uploadS3 } from '../utils'

const resolvers = {
  Query: {
    allUsers: () => User.find()
  },
  Mutation: {
    createUser: (_, args) => User.create(args),
    updateUser: (_, args) =>
      User.findByIdAndUpdate(args.id, args, { new: true }),
    deleteUser: (_, { id }) => User.findByIdAndRemove(id)
  }
}

export default resolvers
