import { Object3D } from '../../model'
import { uploadS3 } from '../../utils'

const createObject3D = async (_, args) => {
  const markerUrl = await uploadS3(args.marker)
  const object3dUrl = await uploadS3(args.object3d)

  args.marker = markerUrl.Location
  args.object3d = object3dUrl.Location

  const objects = await Object3D.create(args)
  await Magazine.findByIdAndUpdate(args.mid, {
    $push: { object3d: objects._id }
  })
  return objects
}

export { createObject3D }