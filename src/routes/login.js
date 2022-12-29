const Router = require('express')
const router = Router()
const loginController = require('../controller/logincontroller')

router.get('/', loginController.getLogin)
router.post('/login', loginController.userLogin)
