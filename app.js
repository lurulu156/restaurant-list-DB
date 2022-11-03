const express = require('express')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

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
//DB connect fail
db.on('error', () => {
  console.log('mongodb error!')
})
//DB connect success
db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(express.static('public'))

//view all restaurants
app.get('/', (req, res) => {
  const restaurants = restaurantList.results
  res.render('index', { restaurants: restaurants })
})

//view one restaurant
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find((item) => {
    return item.id.toString() === req.params.restaurant_id
  })
  res.render('show', { restaurant: restaurant })
})

//view search items
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter((item) => {
    return item.name.toLowerCase().includes(req.query.keyword.toLowerCase()) ||
      item.category.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

//set listen port
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})