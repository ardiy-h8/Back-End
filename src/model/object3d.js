import mongoose from 'mongoose'

const Object3D = mongoose.model('objects', {
  mid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'magazines',
    required: true
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  pages: { type: Number, required: true },
  marker: { type: String, required: true },
  img_marker: { type: String, required: true },
  object3d: { type: String, required: true }
})

export default Object3D
