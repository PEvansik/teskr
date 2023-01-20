

require('../config/passport')

const logOutController = {
    postLogOut : async (req, res) => {
        req.session.destroy((err) => {
            if (err) throw new Error('Bad request');
            res.redirect('/')
        })
    }
}


module.exports = logOutController
