const {Router} = require('express')
const router = Router()
const homeController = require('../controller/home')



router.get('/', homeController.getHome)


module.exports = router