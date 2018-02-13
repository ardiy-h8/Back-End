export default zip => {
  const matches = zip.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)
  return {
    mimetype: matches[1],
    buffer: Buffer.from(matches[2], 'base64')
  }
}
