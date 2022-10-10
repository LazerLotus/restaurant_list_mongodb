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
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

//Create a new restaurant
app.get(('/restaurants/new'), (req, res) => {
  return res.render('new')
})

app.post(('/restaurants'), (req, res) => {
  const restaurant = req.body
  console.log(req.body)
  return Restaurants.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//start and listen on the Express Server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
