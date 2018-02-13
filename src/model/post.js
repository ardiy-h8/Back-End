import mongoose from 'mongoose'

const Post = mongoose.model('posts', {
  zip_file: String
})

export default Post