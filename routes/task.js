const Router = require('express')
const router = Router()
const taskController = require('../controller/task')
const isAuth = require('../middleware/auth')
const passport = require('passport')


router.use(isAuth)


router.get('/', taskController.getTask)
router.post('/createtodo', taskController.postTask)
// router.put('/edittask', taskController.editTask)
router.put('/markcomplete', taskController.markTaskComplete)
router.put('/markincomplete', taskController.markTaskIncomplete)
router.delete('/deletetask', taskController.deleteTask)

module.exports = router