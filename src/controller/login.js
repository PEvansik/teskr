
const bcrypt = require('bcrypt')
const User = require('../models/User')



const loginController = {
    getLogin : async (req, res) => {
        if (!req.session.user) return res.render('login') 
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.redirect('task')    // if user is logged in it skip login page

    },

    postLogin : async (req, res) => {
        const {mail, user, password} = req.body
        // confirm user entered credentials
        if (!password || !mail || !user) return res.status(400).json({
            status: "failed", 
            data: {"message": "email and password are required"}
        })
        // search DB to see if user exists
        const userFound = await User.findOne({$or: [{username: user}, {email: mail}]}).exec()
        if (!userFound) return res.redirect('/signup')
        // if yes
        try {
            const hashPwd = await bcrypt.hash(password, 10) 
            // hashpwd could be password entered as it seems the compare method hashes before it compares them
            const matchPwd = await bcrypt.compare(userFound.password, hashPwd)  
            if (!matchPwd) return res.redirect('/login')
            // set the session to whatever user we get from our DB i.e assign the user a session
            req.session.user = userFound
            console.log(req.session.user)

            // before we redirect from the login page, lets set the isAuth from middleware
            // req.session.isAuth to true
            // send/redirect to 'task

            res.redirect('/task')
        } catch(err) {
            console.error(err)
        }
    }
}


module.exports = loginController