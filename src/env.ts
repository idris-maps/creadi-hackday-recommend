require('dotenv').config()

export default {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  placesApiKey: process.env.PLACES_API_KEY,
}