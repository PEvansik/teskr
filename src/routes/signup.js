const Router = require('express')
const router = Router()
const signupController = require('../controller/signupController')

router.get('/', signupController)
router.post('/signup', )