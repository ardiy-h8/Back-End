import { Magazine } from '../../model'
import { uploadS3 } from '../../utils'

const createMagazine = async (_, args) => {
  const data = await uploadS3(args.cover)
  args.cover = data.Location
  return Magazine.create(args)
}

const updateMagazine = async (_, args) => {
  if (args.cover) {
    const coverUrl = await uploadS3(args.cover)
    args.cover = coverUrl.Location
    return Magazine.findByIdAndUpdate(args.id, args, { new: true })
  } else {
    return Magazine.findByIdAndUpdate(args.id, args, { new: true })
  }
}

const deleteMagazine = (_, { id }) => Magazine.findByIdAndRemove(id)

export { createMagazine, updateMagazine, deleteMagazine }