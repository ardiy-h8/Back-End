import { User, Post, Magazine, Object3D } from '../model'
import { uploadS3 } from '../utils'
import queries from './queries'
import mutations from './mutations'

const resolvers = {
  Query: queries,
  Mutation: mutations
}

export default resolvers
