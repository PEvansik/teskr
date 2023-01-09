const {Router} = require('express')
const router = Router()
const passport = require('passport')
const loginController = require('../controller/login')

// use isAuth middleware here in place of passport if we are doing verification locally
router.get('/', loginController.getLogin)
// invoke pp b4 req hacont
router.post('/', passport.authenticate('local'), loginController.postLogin)

module.exports = router