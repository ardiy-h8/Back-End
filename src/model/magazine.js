import mongoose from 'mongoose'

const Magazine = mongoose.model('magazines', {
  email: { type: String, required: true },
  title: { type: String, required: true },
  imagePreviewUrl: { type: String, required: true },
  object3d: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'objects'
  }]
})

export default Magazine
