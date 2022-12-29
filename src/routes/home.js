const {Router} = require('express')
const router = Router()
const homeController = require('../controller/homecontroller')

router.get('/', homeController.getHome)


module.exports = router