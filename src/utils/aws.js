import AWS from 'aws-sdk'

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
})

const s3 = new AWS.S3()

const decodeBase64Image = image => {
  const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)

  if (matches.length !== 3) return new Error('Invalid input')

  return {
    mimetype: matches[1],
    buffer: Buffer.from(matches[2], 'base64')
  }
}

const uploadS3 = image => {
  const imageObj = decodeBase64Image(image)

  return new Promise((resolve, reject) => {
    s3.upload(
      {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${Date.now()}.${imageObj.mimetype}`, // type is not required
        Body: imageObj.buffer,
        ACL: 'public-read',
        ContentEncoding: 'base64', // required
        ContentType: `image/${imageObj.type}` // required
      },
      (err, data) => {
        if (err) reject(err)
        resolve(data)
      }
    )
  })
}

export default uploadS3
