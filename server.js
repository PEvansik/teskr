const express = require('express')
const mongoose = require('mongoose')
const passport = reqiure('passport')
const MethodOverride =  require('method-override')
const session = require('express-session')
const connectDb = require('./src/config/db')
const MongoStore =  require('connect-mongo')(session)
const app = express()

const homeRoutes = require('./src/routes/home')
const loginRoutes = require('./src/routes/login')
const signupRoutes = require('./src/routes/signup')
const taskRoutes = require('./src/routes/task')
const archiveRoutes = require('./src/routes/archive')

require('dotenv').config({path: './config/.env'})

connectDb()

PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.use('/', homeRoutes)
app.use('/login', loginRoutes)
app.use('/signup', signupRoutes)
app.use('/task', taskRoutes)
app.use('/archive', archiveRoutes)



app.listen(PORT, console.log(`app running on ${PORT}`));