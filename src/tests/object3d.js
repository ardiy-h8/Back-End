const axios = require('axios')
const toBeType = require('jest-tobetype')

const url = 'http://localhost:3001/graphql'
let id = ''

expect.extend(toBeType)

describe('Object 3D resolvers', () => {
  test('Mutation createObject3D', async () => {
    /* const response = await axios.post(url, { query: `
      mutation createObject3D
    `}) */
  })
})