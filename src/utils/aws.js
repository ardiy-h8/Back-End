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

const uploadS3 = image => {
  const imageObj = decodeBase64Image(image)
  const imageType = imageObj.mimetype.split('/')[1]

  return new Promise((resolve, reject) => {
    s3.upload({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${Date.now()}.${imageType}`,
      Body: imageObj.buffer,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: `image/${imageType}`
    }, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

export default uploadS3
