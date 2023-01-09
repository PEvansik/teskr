

module.exports = homeController = {
    getHome: async (req, res) => {
        if (!req.session.user) return res.render('home')
        res.redirect('task')  // if user is logged in it skip home page


        // res.render('home')
    }
}


