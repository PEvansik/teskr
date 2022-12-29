const {Router} = require('express')
const router = Router()
const archivecontroller = require('../controller/archivecontroller')

router.get('archive', archivecontroller.get)
router.delete('archive/delete', archivecontroller.delete)