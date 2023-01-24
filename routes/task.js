const Router = require('express')
const router = Router()
const taskController = require('../controller/task')
const isAuth = require('../middleware/auth')
const passport = require('passport')



// bring the session and auth into the routers
// we would have used req.session.id but since 
// we changed it to req.user in passport then req.user is fine

// router.use((req, res, next) => {
//     console.log('Inside task check middleware')
//     console.log(req.user)
//     // if user is logged in,
//     if (req.user) next();
//     res.send(401)
// })

// OR
// we use the isAuth middleware
router.use(isAuth)


// handle Authentication for a get request

router.get('/', taskController.getTask)
router.post('/createtodo', taskController.postTask)
router.put('/edittask', taskController.editTask)
router.put('/markcomplte', taskController.markTaskComplete)
router.put('/markincomplete', taskController.markTaskIncomplete)
router.delete('/deletetask', taskController.deleteTask)

module.exports = router