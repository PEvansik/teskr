const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const passport = require('passport')
const isAuth = require('./middleware/auth')
const MethodOverride =  require('method-override')
const connectDb = require('./config/db')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const morgan = require('morgan')


const app = express()

const homeRoutes = require('./routes/home')
const loginRoutes = require('./routes/login')
const signupRoutes = require('./routes/signup')
const taskRoutes = require('./routes/task')
const logoutRoutes = require('./routes/logout')


require('dotenv').config({path: './config/.env'})


// // import strategies from pasport
require('./config/passport')

// db connection
connectDb()

require('./models/User')

PORT = process.env.PORT || 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(morgan('dev'))


app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use(express.static('public'));



app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({ 
            mongoUrl: process.env.DB_STRING,
            ttl: 14 * 24 * 60 * 60 // = 14 days. Default
        }),

    })
)

require('./config/passport')


app.use(passport.initialize())
app.use(passport.session())



app.use('/', homeRoutes)
app.use('/login', loginRoutes)
app.use('/signup', signupRoutes)
app.use('/task', taskRoutes)
app.use('/logout', logoutRoutes)






app.listen(PORT, console.log(`app running on ${PORT}`));