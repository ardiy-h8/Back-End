const axios = require('axios')
const toBeType = require('jest-tobetype')
const fs = require('fs')

expect.extend(toBeType)

const uploadS3MockFn = require('./awsMock')

const data = fs.readFileSync(`${__dirname}/assets/hp.jpg`, 'base64')
const matches = data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)
console.log(matches)
// const buffer = Buffer.from(matches[2], 'base64')

const url = 'http://localhost:3001/graphql'
var id = ''
const buffer = fs.readFileSync(`${__dirname}/assets/hp.jpg`)
var imgUrl = ''


describe('Magazine resolvers', () => {
  beforeAll(async () => {
     imgUrl =  await uploadS3MockFn(buffer);
    return imgUrl
  }, 10000);

  test('Mutation createMagazine', async () => {
    const response = await axios.post(url, { query: `
      mutation {
        createMagazine (
          email: "azharie@mail.com",
          title: "Harry Potter and the Philosopher's Stone",
          imagePreviewUrl: "${imgUrl.Location}"
        ) {
          id
        } 
      }
    `})
    const { data: { data: { createMagazine }}} = response
    expect(createMagazine).toBeType('object')
    id = createMagazine.id
    
  })

  test('Mutation updateMagazine', async () => {
    const response = await axios.post(url, {
      query: `
        mutation {
          updateMagazine (
            id: "${id}", 
            cover: "${imgUrl.Location}",
            name: "foo"
          ) {
            id
          }
        }
      `})

    const { data: { data: { updateMagazine } } } = response
    expect(updateMagazine).toBeType('object')
    expect(updateMagazine).toHaveProperty('id')
    expect(updateMagazine.id).toEqual(id)
  })


  test('Mutation deleteMagazine', async () => {
    const response = await axios.post(url, {
      query: `
      mutation {
        deleteMagazine (id: "${id}") {
          id
        }
      }
    `})

    const { data: { data: { deleteMagazine } } } = response
    console.log(deleteMagazine, 'delet')
    expect(deleteMagazine).toBeType('object')
    expect(deleteMagazine.id).toEqual(id)
  })
})


