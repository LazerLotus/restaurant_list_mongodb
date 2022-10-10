//require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

// require express-handlebars here
const exphbs = require('express-handlebars')

//add mongodb conncetion
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected')
})


//require restautant list here
const restaurantList = require('./restaurant.json')
let placeholder = "輸入餐廳、分類"
//setting static files
app.use(express.static('public'))

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//render index page
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results, placeholder: placeholder })
})
//render detail page of restaurant
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

//




//render result of search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })

  if (!keyword.trim().length) {
    let alert = '<script>alert("請輸入有效字串！(不能僅含有空白字元)")</script>'
    res.render('index', { restaurants: restaurantList.results, alert: alert })
    return
  }

  if (restaurants.length === 0) {
    let alert = '<script> alert("' + `您輸入的關鍵字 ${keyword} 沒有找到結果` + '")</script>'
    res.render('index', { restaurants: restaurantList.results, alert: alert })

    return
  }
  placeholder = keyword
  res.render('index', { restaurants: restaurants, placeholder: placeholder })

})

//start and listen on the Express Server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
