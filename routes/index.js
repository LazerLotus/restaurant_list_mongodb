// 引用 Express 與 Express 路由器
const express = require('express')
const Restaurants = require('../models/restaurants')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')

router.use('/', home)
router.use('/restaurants', restaurants)

// 匯出路由器
module.exports = router