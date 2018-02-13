const axios = require('axios')
const toBeType = require('jest-tobetype')
const fs = require('fs')

expect.extend(toBeType)

const url = 'http://localhost:3001/graphql'
let id = ''

const data = fs.readFileSync(`${__dirname}/assets/hp.jpg`, 'base64')
const matches = data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)
console.log(matches)
// const buffer = Buffer.from(matches[2], 'base64')

describe('Magazine resolvers', () => {
  test('Mutation createMagazine', async () => {
    const response = await axios.post(url, { query: `
      mutation {
        createMagazine (
          title: "Harry Potter and the Philosopher's Stone",
          imagePreviewUrl: "${buffer}"
        ) {
          id title imagePreviewUrl object3d
        }
      }
    `})

    const { data: { data: { createMagazine }}} = response
    id = createMagazine.id

    expect(createMagazine).toBeType('object')
    expect(createMagazine).toHaveProperty('id')
    expect(createMagazine).toHaveProperty('name')
    expect(createMagazine).toHaveProperty('cover')
    expect(createMagazine).toHaveProperty('object3d')
    expect(createMagazine.id).toBeType('string')
    expect(createMagazine.name).toBeType('string')
    expect(createMagazine.cover).toBeType('string')
    expect(createMagazine.object3d).toBeType('array')
  })

  test('Mutation updateMagazine', async () => {
    const response = await axios.post(url, { query: `
      mutation {
        updateMagazine (id: "${id}", title: "Harry Potter and the Deathly Hallows") {
          id title imagePreviewUrl object3d
        }
      }
    `})

    const { data: { data: { updateMagazine }}} = response

    expect(updateMagazine).toBeType('object')
    expect(updateMagazine).toHaveProperty('id')
    expect(updateMagazine).toHaveProperty('name')
    expect(updateMagazine).toHaveProperty('cover')
    expect(updateMagazine).toHaveProperty('object3d')
    expect(updateMagazine.id).toBeType('string')
    expect(updateMagazine.name).toBeType('string')
    expect(updateMagazine.cover).toBeType('string')
    expect(updateMagazine.object3d).toBeType('array')
  })

  test('Mutation deleteMagazine', async () => {
    const response = await axios.post(url, { query: `
      mutation {
        deleteMagazine (id: "${id}") {
          id title imagePreviewUrl object3d
        }
      }
    `})

    const { data: { data: { deleteMagazine }}} = response

    expect(deleteMagazine).toBeType('object')
    expect(deleteMagazine).toHaveProperty('id')
    expect(deleteMagazine).toHaveProperty('name')
    expect(deleteMagazine).toHaveProperty('cover')
    expect(deleteMagazine).toHaveProperty('object3d')
    expect(deleteMagazine.id).toBeType('string')
    expect(deleteMagazine.name).toBeType('string')
    expect(deleteMagazine.cover).toBeType('string')
    expect(deleteMagazine.object3d).toBeType('array')
  })
})