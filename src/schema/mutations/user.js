import { User } from '../../model'

const createUser = (_, args) => User.create(args)

const updateUser = (_, args) => User.findByIdAndUpdate(args.id, args, { new: true })

const deleteUser = (_, { id }) => User.findByIdAndRemove(id)

export { createUser, updateUser, deleteUser }