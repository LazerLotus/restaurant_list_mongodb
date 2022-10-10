const mongoose = require('mongoose')
const restaurants = require('../restaurants')

//import JSON data
const restaurantListJson = require('../../restaurant.json')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  restaurants.create(restaurantListJson.results)
    .then(() => {
      console.log('restaurant list seeder created succesfully')
      db.close()
    })
    .catch((error) => console.log(error))
})