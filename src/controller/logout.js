



const User = require('../models/User')



const logOutController = {
    postLogOut : async (req, res) => {
        // logout will basically remove the session from the DB
        req.session.destroy((err) => {
            if (err) throw new Error('Bad request');
            res.redirect('/')
        })
    }
}


module.exports = logOutController
