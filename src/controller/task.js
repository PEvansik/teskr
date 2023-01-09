const Task = require('../models/Task')

const taskController = {
    getTask: async (req, res) => {
        console.log(req.user)
        try{
            const tasks = await Task.find({userId: req.user.id})
            res.render('task', {todos: tasks, user: req.user})
        }catch(err) {
            console.log(err)
        }

    },

    postTask: async (req, res) => {
        try{
            await Task.create({task: req.body.task, completed: false, time: req.body.time, userId: req.used.id})
            console.log('Todo has been added');
            res.redirect('/task')
        }catch(err) {
            console.log(err)
        }
    },

    editTask: async (req, res) => {
        try{
            await Task.findOneAndUpdate({_id: taskFromClient}, {task: req.body.task})
            console.log('Task has been edited')
            res.json('Marked Complete')
        }catch(err) {
            console.log(err)
        }
    },

    markTaskComplete: async (req, res) => {
        try{
            await Task.findOneAndUpdate({_id: taskFromClient}, {completed: true})
            console.log('Task has been updated complete')
            res.json('Marked Complete')
        }catch(err) {
            console.log(err)
        }
    },

    markTaskIncomplete: async (req, res) => {
        try{
            await Task.findOneAndUpdate({_id: taskFromClient}, {completed: false})
            console.log('Task has been updated incomplete')
            res.json('Marked Incomplete')
        }catch(err) {
            console.log(err)
        }
    },

    deleteTask: async(req, res) => {
        try{
            await Task.findOneAndDelete({_id: req.body.taskFromClient})
            console.log('Task has been updated incomplete')
            res.json('Task Deleted')
        }catch(err) {
            console.log(err)
        }
    }

}

module.exports = taskController