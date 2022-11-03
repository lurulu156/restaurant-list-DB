const express = require('express')
const app = express()
const port = 3000
// const restaurantList = require('./restaurant.json')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const restaurant = require('./models/restaurant')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

//set up handlebars
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//set mongoose and env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//set DB connection status
const db = mongoose.connection
//connect fail
db.on('error', () => {
  console.log('mongodb error!')
})
//connect success
db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(express.static('public'))

//view all restaurants
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})

//create new item - GET
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

//create new item - POST
app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
  .then( ()=> res.redirect('/'))
  .catch(err => console.log(err))

})

//view one restaurant
app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

//view search items
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find()
    .lean()
    .then(data => data)
    .then(data => {
      const restaurants = data.filter((item) => {
        return item.name.toLowerCase().includes(req.query.keyword.toLowerCase()) ||
          item.category.toLowerCase().includes(req.query.keyword.toLowerCase())
      })
      res.render('index', { restaurants: restaurants, keyword: keyword })
    }
    )
    .catch(err => console.log(err))
})



//set listen port
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})