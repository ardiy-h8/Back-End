import mongoose from 'mongoose'

const User = mongoose.model('users', {
  email: String,
  password: String
})

export default User
