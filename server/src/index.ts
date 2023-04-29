import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from './routes/routes'

dotenv.config()
const app = express()
const URL = process.env.APP_URL || process.env.LOCAL_URL
const MONGO_URL = process.env.MONGO_URL || process.env.LOCAL_MONGO_URL
const PORT = process.env.PORT || 3000

mongoose.connect(`${MONGO_URL}`)

app.use(express.json())
app.use(router)
app.listen(PORT, () => {
  console.log(`Server is running on ${URL} 🚀`)
})