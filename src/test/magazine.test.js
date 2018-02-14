const axios = require('axios')
const toBeType = require('jest-tobetype')
const fs = require('fs')

const { uploadS3 } = require('../utils')

expect.extend(toBeType)

const url = 'http://localhost:3001/graphql'
let id = ''

describe('Magazine resolvers', () => {
  beforeAll(() => {
    const buffer = fs.readFileSync(`${__dirname}/assets/hp.jpg`)
    const base64 = 'data:image/jpeg;base64,' + Buffer.from(buffer, 'ascii').toString('base64')
    let imgUrl = ''
     uploadS3(base64)
  })

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
    id = createMagazine.id

    expect(createMagazine).toBeType('object')
  })

  /* test('Mutation updateMagazine', async () => {
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
    expect(deleteMagazine).toBeType('object')
    expect(deleteMagazine.id).toEqual(id)
  }) */
})
