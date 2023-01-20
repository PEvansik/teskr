
require('../config/passport')

module.exports = homeController = {
    getHome: async (req, res) => {
        if (!req.user) return res.render('home')
        res.redirect('task')
    }
}


