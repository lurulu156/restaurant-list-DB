const mongoose = require('mongoose')
const Restaurant = require('../restaurant') //Load restaurant model
const restaurantList = require('../../restaurant.json')

//set mongoose and env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//set DB connection status
const db = mongoose.connection
//DB connect fail
db.on('error', () => {
  console.log('mongodb error!')
})
//DB connect success
//create seeds
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 8; i++) {
    Restaurant.create(
      {
        name: `${restaurantList.results[i].name}`,
        name_en: `${restaurantList.results[i].name_en}`,
        category: `${restaurantList.results[i].category}`,
        image: `${restaurantList.results[i].image}`,
        location: `${restaurantList.results[i].location}`,
        phone: `${restaurantList.results[i].phone}`,
        google_map: `${restaurantList.results[i].google_map}`,
        rating: `${restaurantList.results[i].rating}`,
        description: `${restaurantList.results[i].description}`
      }
    )
  }
  console.log('seeds done')
})