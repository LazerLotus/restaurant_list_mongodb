// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurants = require('../../models/restaurants')
let placeholder = "輸入餐廳、分類"


//render index page
router.get(('/'), (req, res) => {
  Restaurants.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants, placeholder }))
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error: error.message })
    })
})

//render result of search
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const keywordEnter = req.query.keyword
  //if keyword is empty string, redirect to home 
  if (!keyword) {
    return res.redirect('/')
  }

  return Restaurants.find({})
    .lean()
    .then((restaurants) => {
      const searchRestaurant = restaurants.filter(
        (data) =>
          data.name.toLowerCase().includes(keyword) || data.category.toLowerCase().includes(keyword)
      )
      res.render('index', { restaurants: searchRestaurant, placeholder: keywordEnter })
    })
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error: error.message })
    })

})

module.exports = router