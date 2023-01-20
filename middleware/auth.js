
// this serves to prevent users from moving form onepage to 
// another whether they are logged in or not.
// it will check our req.session
// before we redirect from the login page, lets set the isAuth from middleware
// req.session.isAuth to true

const isAuth = (req, res, next) => {
    if (!req.isAuthenticated()) res.redirect('/login');
    console.log('user authenticated')
    console.log(req.user)
    next()
}


// we will also embed this piece of middle ware inside the privledge pages 
// like the task and archive pages

module.exports = isAuth