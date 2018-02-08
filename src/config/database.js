import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
mongoose.connect(process.env.DB_URI)
const connection = mongoose.connection

export { mongoose, connection }
