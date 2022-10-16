const express = require('express')
const Restaurants = require('../../models/restaurants')
const router = express.Router()

//Create a new restaurant page
router.get(('/new'), (req, res) => {
  return res.render('new')
})

//Create a new restaurant post to server
router.post(('/'), (req, res) => {
  const restaurant = req.body
  return Restaurants.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error: error.message })
    })
})

//Render Detail Page
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error: error.message })
    })
})

//Render Edit Page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error: error.message })
    })
})
//PUT Edit Result
router.put('/:id', (req, res) => {
  const id = req.params.id
  console.log(req.body)
  console.log(id)
  return Restaurants.findByIdAndUpdate(id, req.body)
    .lean()
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error: error.message })
    })
})

//delete restaurant
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error: error.message })
    })


})

module.exports = router