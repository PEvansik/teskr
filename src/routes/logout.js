const { Router } = require('express')
const passport = require('passport')
const router = Router()
const logOutController = require('../controller/logout')



require('../config/passport')

router.get('/', logOutController.postLogOut)




module.exports = router