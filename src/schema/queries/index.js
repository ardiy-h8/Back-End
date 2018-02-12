import { User, Magazine, Object3D } from '../../model'

export default {
  allUsers: () => User.find(),
  allMagazines: () => Magazine.find()
}