const uploadMockFn = require('./awsMock')
const toBeType = require('jest-tobetype')
const fs = require('fs')



const imgBuffer = fs.readFileSync(`${__dirname}/assets/hp.jpg`)
let resultUpload = {}
describe('testing upload function', () => {
  it('should throw error', async () => {
    const uploadImg = await uploadMockFn(imgBuffer, 'ardy-test')
    console.log(uploadImg.Location)
    expect(uploadImg.Location).toHaveProperty("Location")
    resultUpload = uploadImg
  })
  it(`should contain object Etag`, () => {
    expect(resultUpload).toHaveProperty({Etag})
  })
  it(`should contain bucket name`, () => {
    expect(resultUpload.Bucket).toBe(undefined)
  })
})