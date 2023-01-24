
const mongoose = require('mongoose')


const Schema = mongoose.Schema

const taskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
    },
    userId: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Task', taskSchema)
