const { Router } = require('express')
const passport = require('passport')
const router = Router()
const logOutController = require('../controller/logout')



require('../config/passport')

router.get('/', logOutController.postLogOut)
// router.all('*', async (req, res) => {
//     try{res.status(409).json({msg: "no route matches your request"})}
// })




module.exports = router