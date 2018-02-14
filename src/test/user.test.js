const axios = require('axios')
const toBeType = require('jest-tobetype')

const url = 'http://localhost:3001/graphql'
let id = ''

expect.extend(toBeType)

describe('User resolvers', () => {
  test('Query all users', async () => {
    const response = await axios.post(url, { query: `
      query {
        allUsers {
          id email password
        }
      }
    ` })

    const { data: { data: { allUsers}}} = response
    expect(allUsers).toBeType('array')
  })

  test('Mutation create user', async () => {
    const response = await axios.post(url, { query: `
      mutation {
        createUser (email: "yofri@mail.com", password: "letmein") {
          id email password
        }
      }
    ` })

    const { data: { data: { createUser }}} = response
    id = createUser.id

    expect(createUser).toBeType('object')
    expect(createUser).toHaveProperty('id')
    expect(createUser).toHaveProperty('email')
    expect(createUser).toHaveProperty('password')
    expect(createUser.id).toBeType('string')
    expect(createUser.email).toBeType('string')
    expect(createUser.password).toBeType('string')
  })

  test('Mutation update user', async () => {
    const response = await axios.post(url, { query: `
      mutation {
        updateUser (id: "${id}", email: "yofri@mail.com", password: "letmeout") {
          id email password
        }
      }
    `})

    const { data: { data: { updateUser }}} = response

    expect(updateUser).toBeType('object')
    expect(updateUser).toHaveProperty('id')
    expect(updateUser).toHaveProperty('email')
    expect(updateUser).toHaveProperty('password')
  })

  test('Mutation delete user', async () => {
    const response = await axios.post(url, { query: `
      mutation {
        deleteUser (id: "${id}") {
          id email password
        }
      }
    `})

    const { data: { data: { deleteUser }}} = response

    expect(deleteUser).toBeType('object')
    expect(deleteUser).toHaveProperty('id')
    expect(deleteUser).toHaveProperty('email')
    expect(deleteUser).toHaveProperty('password')
  })

  test('User not created if input empty', async () => {
    const response = await axios.post(url, { query: `
       mutation {
        createUser (email: "", password: "") {
          id email password
        }
      }
    `})

    const { data: { data: { createUser }}} = response

    expect(createUser.email).toBeFalsy()
    expect(createUser.password).toBeFalsy()
  })
})