import AWS from 'aws-sdk'

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
})

const s3 = new AWS.S3()

const decodeBase64Image = image => {
  if (image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)) {
    const matches = image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)
    return {
      mimetype: matches[1],
      buffer: Buffer.from(matches[2], 'base64')
    }
  } else if (image.substr(0, 13) === 'data:;base64,') {
    const dae = image.substring(13, image.length)
    return {
      mimetype: 'image/dae',
      buffer: Buffer.from(dae, 'base64')
    }
  } else {
    return {
      mimetype: 'image/patt',
      buffer: image
    }
  }
}

const upload = (buffer, type) => {
  const params = {
    Bucket: 'ardy-test',
    Key: `${Date.now()}.${type}`,
    Body: buffer,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: `image/${type}`
  }

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

const uploadS3 = async file => {
  if (typeof file === 'object') {
    return upload(file, 'dae')
  } else {
    const imageObj = decodeBase64Image(file)
    const imageType = imageObj.mimetype.split('/')[1]
    return upload(imageObj.buffer, imageType)
  }
}

export default uploadS3
