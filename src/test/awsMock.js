const AWS = require('aws-sdk')

AWS.config.update({
  accessKeyId: 'AKIAIF4SMMDSMQU4OAPA',
  secretAccessKey: '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'
})

const s3 = new AWS.S3()


const uploadS3MockFn = (imgBuffer, bucket) => {
  // const imageObj = decodeBase64Image(image)
  const imageType = 'jpg'
  return new Promise((resolve, reject) => {
    s3.upload({
      Bucket: `${bucket}`,
      Key: `${Date.now()}.${imageType}`,
      Body: imgBuffer,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: `image/${imageType}`
    }, (err, data) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

module.exports = uploadS3MockFn