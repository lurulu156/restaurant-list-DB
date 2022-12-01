const Restaurant = require('../restaurant') //Load restaurant model
const restaurantList = require('../../restaurant.json')
const User = require('../user')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const SEED_USER = [
  {
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    email: 'user2@example.com',
    password: '12345678'
  }]
db.once('open', () => {
  //先創建所有seed使用者
  Promise.all(Array.from({ length: 2 },
    (_, i) => bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER[i].password, salt))
      .then(hash => User.create({
        email: SEED_USER[i].email,
        password: hash
      }))))
    .then(userArr => {
      let userId = ''
      return Promise.all(Array.from({ length: 6 },
        (_, i) => {
          if (i < 3) { userId = userArr[0]._id } else {
            userId = userArr[1]._id
          }
          return Restaurant.create({
            userId,
            name: `${restaurantList.results[i].name}`,
            name_en: `${restaurantList.results[i].name_en}`,
            category: `${restaurantList.results[i].category}`,
            image: `${restaurantList.results[i].image}`,
            location: `${restaurantList.results[i].location}`,
            phone: `${restaurantList.results[i].phone}`,
            google_map: `${restaurantList.results[i].google_map}`,
            rating: `${restaurantList.results[i].rating}`,
            description: `${restaurantList.results[i].description}`
          })
        }
      ))
    })
    .then(() => {
      console.log('seeds done.')
      process.exit()
    })
})
