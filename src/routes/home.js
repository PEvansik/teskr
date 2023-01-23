const {Router} = require('express')
const router = Router()
const homeController = require('../controller/home')
require('../models/User')


router.get('/', homeController.getHome)


module.exports = router