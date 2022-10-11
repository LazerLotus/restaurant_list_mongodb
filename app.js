//require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const Restaurants = require('./models/restaurants')
let placeholder = "輸入餐廳、分類"

// require express-handlebars here
const exphbs = require('express-handlebars')
// require body parser
const bodyParser = require('body-parser')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

//add mongodb conncetion
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected')
})

//setting static files
app.use(express.static('public'))

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//render index page
app.get(('/'), (req, res) => {
  Restaurants.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants, placeholder }))
    .catch(error => console.log(error))
})

//Create a new restaurant page
app.get(('/restaurants/new'), (req, res) => {
  return res.render('new')
})
//Create a new restaurant post to server
app.post(('/restaurants'), (req, res) => {
  const restaurant = req.body
  return Restaurants.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//Render Detail Page
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//Render Edit Page
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
//Post Edit Result
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  console.log(req.body)
  console.log(id)
  return Restaurants.findByIdAndUpdate(id, req.body)
    .lean()
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//delete restaurant
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))


})
//render result of search
app.get('/search', (req, res) => {
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
    .catch(error => console.log(error))

})


//start and listen on the Express Server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
