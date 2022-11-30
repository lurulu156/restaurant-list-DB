// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用model
const Restaurant = require('../../models/restaurant')
// 定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id
  const sort = req.query.sort ? req.query.sort : { _id: 'asc' }
  const sortMapping = {
    'AtoZ': { name: 'asc' },
    'ZtoA': { name: 'desc' },
    'category': { category: 'asc' },
    'location': { location: 'asc' }
  }
  Restaurant.find({ userId })
    .lean()
    .sort(sortMapping[sort])
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})

//view search items
router.get('/search', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword
  Restaurant.find({ userId })
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
// 匯出路由模組
module.exports = router