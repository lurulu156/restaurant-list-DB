const express = require('express')
const alert = require('alert')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//create new item - GET
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  const restaurant = { name, name_en, category, image, location, phone, google_map, rating, description}
  if (Object.values(restaurant).some(item => item.length === 0)) {
    alert(`請確認每個欄位有值`)
    return res.render('new', { restaurant })
  } else {
    return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  }
})

//edit specific item
router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})
router.put('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  const restaurant = { name, name_en, category, image, location, phone, google_map, rating, description }
  if (Object.values(restaurant).some(item => item.length === 0)) {
    alert(`請確認每個欄位有值`)
    return res.redirect(`/restaurants/${id}/edit`)
  } else {
    return Restaurant.findById(id)
      .then(restaurant => {
        restaurant.name = name
        restaurant.name_en = name_en
        restaurant.category = category
        restaurant.image = image
        restaurant.location = location
        restaurant.phone = phone
        restaurant.google_map = google_map
        restaurant.rating = rating
        restaurant.description = description
        return restaurant.save()
      })
      .then(() => res.redirect(`/restaurants/${id}`))
      .catch(err => console.log(err))
  }
})

//delete item
router.delete('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//view one restaurant
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

module.exports = router