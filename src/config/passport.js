const passport = require('passport')
// import strategy class
const { Strategy} = require('passport-local')
const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = function (passport) {
    // reference the passport library and call serialize user
  // done is the same as the function in verify
  passport.serializeUser((user, done) => done(null, user.id))

  // we now implement deserializeUser
  passport.deserializeUser(async (id, done) => {
    console.log(id)
    console.log('deserializing user')
    // we will now search the DB for the user
    try {
      // you can search by email but better to do id 
      const user = await User.findById({id})
      if (!user)  throw new Error('User not found');
      // whatever we pass in to this user is what is going tonbe stored
      // in this req.user property
      done(null, user);
      console.log(user)
    } catch (err) {
      console.log(err)
      done(err, null)
    }

  })


  passport.use(
    new Strategy(
      {
        // set the username field to accept email address if this is ignored,
        // it wil default to using username to authenticate
        userEmailField: 'email'
      },
      // verify function
      async (email, password, done) => {
        // each tme the userr calls the endpoint, 
        // search the DB fior the field user will use to login
        console.log(email);
        console.log(password)
        
        // if(!email || !password) {
        //   // we pass in null for user because there is no user yet as 
        //   // we havnt searched the DB and havnt done validation
        //   done(new Error('Bad Request, Missing credentials'), null)
        // }
        // find a user in the db
        const userFound = await User.findOne({email: email.toLowerCase()}).exec()
        if(!userFound) resizeBy.send(401).json({
          status: "Bad Request",
          data: {"data": "user not found"}
        })
        try{
          hashpwd = bcrypt.hash(password, 10)
          matchpwd = bcrypt.compare(userFound.password, hashpwd)

          if(!matchpwd) res.status(401);
          // console.log('Authenticated successfully');
          // done will alow us to serialise and deserialise the userFound into the session
          done(null, userFound) //it will serialize from here

        }catch(err) {
          console.log(err)
          done(err, null)
        }
      }
    )
  )
}


// module.exports = Strategy














































// const LocalStrategy = require('passport-local').Strategy
// const mongoose = require('mongoose')
// const User = require('../models/User')

// module.exports = function (passport) {
//   passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
//     User.findOne({ email: email.toLowerCase() }, (err, user) => {
//       if (err) { return done(err) }
//       if (!user) {
//         return done(null, false, { msg: `Email ${email} not found.` })
//       }
//       if (!user.password) {
//         return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' })
//       }
//       user.comparePassword(password, (err, isMatch) => {
//         if (err) { return done(err) }
//         if (isMatch) {
//           return done(null, user)
//         }
//         return done(null, false, { msg: 'Invalid email or password.' })
//       })
//     })
//   }))
  

//   passport.serializeUser((user, done) => {
//     done(null, user.id)
//   })

//   passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => done(err, user))
//   })
// }