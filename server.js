const express = require('express')
// enables us to use mongodb
const mongoose = require('mongoose')
const path = require('path')

const passport = require('passport')
const isAuth = require('./middleware/auth')

const MethodOverride =  require('method-override')
// bing in the mongodb connection
const connectDb = require('./src/config/db')

// help us to have logged in users  and users are able t have logged in status
// its done by a cokie that matches the DB session
// gives users the ability to og in go away come and are still logged in
const session = require('express-session')

const MongoStore = require('connect-mongo')

const cookieParser = require('cookie-parser')

// display messages such as warnings, notifications etc.
const { flash } = require('express-flash-message');

// debugger that shows noun path and status codes
const logger = require('morgan')

const app = express()

const homeRoutes = require('./src/routes/home')
const loginRoutes = require('./src/routes/login')
const signupRoutes = require('./src/routes/signup')
const taskRoutes = require('./src/routes/task')

// const archiveRoutes = require('./src/routes/archive')

require('dotenv').config({path: './src/config/.env'})
// require('dotenv').config({ path: require('find-config')('.env') })

// import strategies from pasport
require('./src/config/passport')(passport)

// db connection
connectDb()

PORT = process.env.PORT || 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))


app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Sessions - initialise a session for use in the project
// use the express-session package to handle the session
// we need a unique cookie for each user and the secrete makes it harder
app.use(
    // this sends a session to our request object
    // it makes the system statefull
    session({
        // sign the cookie
        secret: process.env.SESSION_SECRET,
        // for every request to the server create a new session - false
        resave: false,
        // if we have not modified the session dont save it
        saveUninitialized: false,
        // we'll store our session info in our Mongo db
        store: MongoStore.create({ 
            mongoUrl: process.env.DB_STRING,
            ttl: 14 * 24 * 60 * 60 // = 14 days. Default
        }),

    })
)


// passport middleware
// initiaise passport on every route call
app.use(passport.initialize())
// allow passport to use "express-session"
app.use(passport.session())

app.use(flash())


app.use('/', homeRoutes)
app.use('/login', loginRoutes)
app.use('/signup', signupRoutes)
app.use('/task', taskRoutes)

// app.use('/archive', archiveRoutes)


app.use(express.static('src/public'));



app.listen(PORT, console.log(`app running on ${PORT}`));