const axios = require('axios')
const toBeType = require('jest-tobetype')
const request = require('supertest')
const fs = require('mz/fs')

const url = 'http://localhost:3001/graphql'
let id = ''

expect.extend(toBeType)

describe('Object 3D resolvers', () => {
  test('Mutation createObject3D', async () => {

  })
})