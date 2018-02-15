import fs from 'fs'
import download from 'download'
import s3FolderUpload from 's3-folder-upload'
import rimraf from 'rimraf'

import { Object3D, Magazine } from '../../model'
import { uploadS3 } from '../../utils'

const credentials = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'ap-southeast-1',
  bucket: process.env.S3_BUCKET_NAME
}

const createObject3D = async (_, args) => {
  const markerUrl = await uploadS3(args.img_marker)
  const patternUrl = await uploadS3(args.marker)
  const zipUrl = await uploadS3(args.object3d)
  let dae = ''

  await download(zipUrl.Location, `${__dirname}/assets`, {
    extract: true
  })

  const files = fs.readdirSync(`${__dirname}/assets`)
  for (let i = 0; i < files.length; i++) {
    if (files[i].substr(-3) === 'dae') {
      const bufferDae = fs.readFileSync(`${__dirname}/assets/${files[i]}`)
      const data = await uploadS3(bufferDae)
      dae = data.Location
    } else {
      s3FolderUpload(`${__dirname}/assets/${files[i]}`, credentials)
    }
    rimraf.sync(`${__dirname}/assets/${files[i]}`)
  }

  args.img_marker = markerUrl.Location
  args.marker = patternUrl.Location
  args.object3d = dae

  const objects = await Object3D.create(args)
  await Magazine.findByIdAndUpdate(args.mid, {
    $push: { object3d: objects._id }
  })

  // rimraf.sync(`${__dirname}/assets`)
  return objects
}

const deleteObject3D = (_, { id }) => Object3D.findByIdAndRemove(id)

export { createObject3D, deleteObject3D }