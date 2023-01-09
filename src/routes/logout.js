const { Router } = require('express')
const router = Router()
const logOutController = require('../controller/logout')

router.post('logout', logOutController.postLogOut)

module.exports = router