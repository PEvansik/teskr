const Router = require('express')
const router = Router()
const signupController = require('../controller/signup')

router.get('/', signupController.getSignup)
router.post('/', signupController.postNewUSer)


module.exports = router