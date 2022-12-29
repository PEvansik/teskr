const Router = require('express')
const router = Router()
const logincontroller = require('../controller/logincontroller')

router.get('/login', logincontroller)