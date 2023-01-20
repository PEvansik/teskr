
const bcrypt = require('bcrypt')
const User = require('../models/User')


const signupController = {
    getSignup : async (req, res) => {
        if (!req.user) return res.render('signup');
        res.redirect('task') 
    },

    postNewUSer : async (req, res) => {
        const {email, username, password} = req.body
        if (password.length <= 4 || !email || !username) return res.statusMessage("signup incomplete").redirect('/login')  // check if theis will throw an error
        const duplicated = await User.findOne({$or: [{username: username}, {email: email}]}).exec()
        if (duplicated) return res.statusMessage("User already exist").redirect('/login') // check if theis will throw an error
        try {
            console.log(password)
            const hashPwd = await bcrypt.hash(password, 10) 
            await User.create({
                "username": username,
                "email": email,
                "password": hashPwd
            })
            res.redirect('/login')
        } 
        catch(err) {
            console.error(err)
        }
    }
}

module.exports = signupController