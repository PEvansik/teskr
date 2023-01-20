const mongoose = require('mongoose')
require('dotenv').config({path: './.env'})


const connectDb = async _ => {
    try{
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.DB_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB connected: ${conn.connection.host}`)
    }
    catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDb