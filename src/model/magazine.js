import mongoose from 'mongoose'

const Magazine = mongoose.model('magazines', {
  name: { type: String, required: true },
  cover: { type: String, required: true },
  object3d: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'objects'
  }]
})

export default Magazine
