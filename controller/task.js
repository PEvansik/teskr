const Task = require('../models/Task')

const taskController = {
    getTask: async (req, res) => {
        try{
            console.log('entered task')
            const tasks = await Task.find({userId: req.user.id})
            console.log(tasks)
            const itemsLeft = await Task.countDocuments({userId:req.user.id, completed: false})
            if (tasks) return res.render('task', 
                {
                    todos: tasks, 
                    left: itemsLeft,
                }
            )
            res.render('task')
        }catch(err) {
            console.log(err)
        }

    },

    postTask: async (req, res) => {
        try{
            await Task.create(
                {
                    task: req.body.todoitem, 
                    completed: false, 
                    time: req.body.time, 
                    userId: req.user.id
                }
            )
            console.log('Todo has been added');
            res.redirect('/task')
        }catch(err) {
            console.log(err)
        }
    },

    editTask: async (req, res) => {
        try{
            await Task.findOneAndUpdate(
                {_id: taskFromClient}, 
                {task: req.body.task}
            )
            console.log('Task has been edited')
            res.json('Marked Complete')
        }catch(err) {
            console.log(err)
        }
    },

    markTaskComplete: async (req, res) => {
        try{
            await Task.findOneAndUpdate(
                {_id: req.body.todoIdFromJSFile}, 
                {completed: true}
            )
            console.log('Task has been updated complete')
            res.json('Marked Complete')
        }catch(err) {
            console.log(err)
        }
    },

    markTaskIncomplete: async (req, res) => {
        try{
            await Task.findOneAndUpdate(
                {_id: req.body.todoIdFromJSFile}, 
                {completed: false}
            )
            console.log('Task has been updated incomplete')
            res.json('Marked Incomplete')
        }catch(err) {
            console.log(err)
        }
    },

    deleteTask: async(req, res) => {
        try{
            console.log(req.body.todoIdFromJSFile)
            await Task.findOneAndDelete(
                {_id: req.body.todoIdFromJSFile}
            )
            console.log(req.body.todoIdFromJSFile)
            console.log('Task has been deleted')
            // res.json('Task Deleted')
            return res.redirect('/task')
        }catch(err) {
            console.log(err)
        }
    }

}

module.exports = taskController