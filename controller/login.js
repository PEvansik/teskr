

require('../config/passport')

const loginController = {
    getLogin : async (req, res) => {
        if (!req.user) return res.render('login');
        res.redirect('task')
    },

}


module.exports = loginController