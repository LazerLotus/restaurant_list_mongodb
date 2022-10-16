const restaurants = require('../restaurants')
//import JSON data
const restaurantListJson = require('../../restaurant.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  restaurants.create(restaurantListJson.results)
    .then(() => {
      console.log('restaurant list seeder created succesfully')
      db.close()
    })
    .catch((error) => console.log(error))
})