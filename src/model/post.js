import mongoose from 'mongoose'

const Post = mongoose.model('posts', {
  image: String
})

export default Post
