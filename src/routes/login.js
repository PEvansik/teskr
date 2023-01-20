const {Router} = require('express')
const router = Router()
const passport = require('passport')
const loginController = require('../controller/login')

require('../config/passport')


router.get('/', loginController.getLogin)

router.post('/', passport.authenticate('login', {
  failureRedirect: '/login',
  successRedirect: '/task',
  }))
// router.post('/', isAuth, loginController.postLogin)

module.exports = router