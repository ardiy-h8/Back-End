import { Object3D, Magazine } from '../../model'
import { uploadS3 } from '../../utils'

const createObject3D = async (_, args) => {
  const markerUrl = await uploadS3(args.img_marker)
  const patternUrl = await uploadS3(args.marker)
  const object3dUrl = await uploadS3(args.object3d)

  args.img_marker = markerUrl.Location
  args.marker = patternUrl.Location
  args.object3d = object3dUrl.Location

  console.log('got marker', patternUrl)

  const objects = await Object3D.create(args)
  await Magazine.findByIdAndUpdate(args.mid, {
    $push: { object3d: objects._id }
  })
  return objects
}

const deleteObject3D = (_, { id }) => Object3D.findByIdAndRemove(id)

export { createObject3D, deleteObject3D }