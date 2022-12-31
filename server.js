const express = require('express')
const mongoose = require('mongoose')
// for authentication
const passport = reqiure('passport')
// allows us to use other verbs
const MethodOverride =  require('method-override')
const connectDb = require('./src/config/db')
// help us to have logged in users  and users are able t have logged in status
// its done by a cokie that matches the DB session
// gives users the ability to og in go away come and are still logged in
const session = require('express-session')
const MongoStore =  require('connect-mongo')(session)
// display messages such as warnings, notifications etc.
const { flash } = require('express-flash-message');
// debugger that shows noun path and status codes
const logger = require('morgan')

const app = express()

const homeRoutes = require('./src/routes/home')
const loginRoutes = require('./src/routes/login')
const signupRoutes = require('./src/routes/signup')
const taskRoutes = require('./src/routes/task')
const archiveRoutes = require('./src/routes/archive')

require('dotenv').config({path: './config/.env'})

// passport config
require('./src/config/passport')(passport)

connectDb()

PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')



app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// Sessions
// use the express-session package to hande the session
// we need a unique cookie for each user and the secrete makes it harder
app.use(
    session({
        secrete:'keyboard cat',
        resave: false,
        saveUninitialized: false,
        // we'll store our session info in our Mongo db
        store: new MongoStore({mongooseConnection: mongoose.connection}),
    })
)

app.use(logger('dev'))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())


app.use('/', homeRoutes)
app.use('/login', loginRoutes)
app.use('/signup', signupRoutes)
app.use('/task', taskRoutes)
app.use('/archive', archiveRoutes)



app.listen(PORT, console.log(`app running on ${PORT}`));