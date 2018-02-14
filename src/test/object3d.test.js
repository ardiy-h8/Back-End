const axios = require('axios')
const toBeType = require('jest-tobetype')

const url = 'http://localhost:3001/graphql'
var id = ''

expect.extend(toBeType)

describe('Object 3D resolvers', () => {

  test('Mutation createObject3D to defined', async () => {
    const response = await axios.post(url, { query: `
      mutation {
        createObject3D (
          mid: "5a825445e0f9522442d42dcf",
          title: "boom",
          description: "fobar",
          pages: 18,
          img_marker: "sgseer",
          marker: "https://ardy-test.s3.amazonaws.com/1518518212411.patt",
          object3d: "foigjiogj"
        ) { id, marker }
      }  
    `})
    const {data: { data: { createObject3D }}} = response
    expect(createObject3D).toBeType('object')
    expect(createObject3D).toHaveProperty('marker')
    id = createObject3D.id
  })

  test('Mutation deleteObject3D', async () => {
    const response = await axios.post(url, {query: `
      mutation {
        deleteObject3D (
          id: "${id}"
        ) {
          id
        }
      }
    `})
    const { data: { data: { deleteObject3D } } } = response
    expect(deleteObject3D).toBeType('object')
    expect(deleteObject3D.id).toEqual(id)
  })
})




describe('write data Object3ds got wrong', () => {
  var description;
  var title;
  test('should expect mid toBe azharie@live.com', async () => {
    const response = await axios.post(url, {
      query: `
        mutation {
        createObject3D (
          mid: "5a82cb2b537a2b7661c91439",
          title: "${title}",
          description: "fobar",
          pages: 18,
          img_marker: "rgee5y5",
          marker: "https://ardy-test.s3.amazonaws.com/1518518212411.patt",
          object3d: "foigjiogj"
        ) { id, marker }
      }  
    `})

    const { data: { data: { createObject3D } } } = response
    expect(createObject3D.title).toBe(undefined)
  })

  test('should expect marker toBe string', async () => {
    const response = await axios.post(url, {
      query: `
         mutation {
          createObject3D (
            mid: "5a82cb2b537a2b7661c91439",
            title: "boom",
            description: "${description}" ,
            pages: 18,
            img_marker: "https://ardy-test.s3.amazonaws.com/1518518212411.patt",
            marker: "0",
            object3d: "foigjiogj"
        ) { id, marker }
      }  
    `})

    const { data: { data: { createObject3D } } } = response
    expect(createObject3D.description).toEqual(undefined)
  })
})