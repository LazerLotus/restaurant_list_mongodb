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
  const sort = req.query.sort
  const order = req.query.order
  const title = req.query.title
  const keywordEnter = req.query.keyword
  //if keyword is empty string, redirect to home 
  if (!keyword && !sort) {
    return res.redirect('/')
  }

  return Restaurants.find({})
    .lean()
    .sort({ [sort]: order })
    .then((restaurants) => {
      const searchRestaurant = !keyword ? restaurants : restaurants.filter(
        (data) =>
          data.name.toLowerCase().includes(keyword) || data.category.toLowerCase().includes(keyword)
      )
      placeholder = !!keywordEnter.trim() ? keywordEnter : "輸入餐廳、分類"

      res.render('index', { restaurants: searchRestaurant, placeholder: placeholder, keyword: keywordEnter, title })
    })
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error: error.message })
    })

})

module.exports = router