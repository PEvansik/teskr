
const bcrypt = require('bcrypt')
const User = require('../models/User')


const signupController = {
    getSignup : async (req, res) => {
        res.render('signup')
    },

    postNewUSer : async (req, res) => {
        // extract inputs
        const {mail, user, password} = req.body

        // check that they are not empty
        if (!password || !mail || !user) return res.status(400).json({
            status: "failed", 
            data: {"message": "email and password are required"}
        })
        const duplicated = await User.findOne({$or: [{username: user}, {email: mail}]}).exec()
        if (duplicated) return res.status(409).json({
            status: "failed", 
            data: {"message": "User already exist"}
        })
        try {
            const hashPwd = await bcrypt.hash(password, 10) 
            const newUser = await User.create({
                "username": user,
                "email": mail,
                "password": hashPwd
            })
            // OR
            // const newUser = await new User({
            //     "username": user,
            //     "email": mail,
            //     "password": hashPwd
            // }).save
            console.log(newUser)
            console.log('logged in')


            res.redirect('/login')

            // res.render('task')
        } catch(err) {
            console.error(err)
        }
    }
}

module.exports = signupController