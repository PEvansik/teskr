const {Router} = require('express')
const router = Router()
const archivecontroller = require('../controller/archive')

router.get('archive', archivecontroller.get)
router.delete('archive/delete', archivecontroller.delete)


// this does the work of auth middleware
router.use((req, res, next) => {
    if (!req.session.user) res.send(401);
    next()
})