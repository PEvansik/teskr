const express = require('express')
const passport = require('passport')
const localStrategy = require("passport-local").Strategy;
const User = require('../models/User')
const bcrypt = require('bcrypt')


passport.serializeUser((user, done) => {
  done(null, user.id)}
)


passport.deserializeUser(async (id, done) => {
  console.log(id)
  console.log('deserializing user')
  try {
    const user = await User.findById(id)
    console.log(user)
    if (!user)  {
      throw new Error('User not found')
    }
    console.log(user)
    done(null, user);

  } catch (err) {
    console.log(err)
    done(err, null)
  }
})

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      
      if (password.length <= 4 || !email) done(new Error('Bad Request, Missing credentials'), null)

      const duplicated = await User.findOne({'email': email}).exec()
      if(duplicated) res.send(401).json({
        status: "Bad Request",
        data: {"data": "User already exist"}
      })
      try{
        const hashPwd = await bcrypt.hash(password, 10) 
        const newUser = await User.create({
          "email": email,
          "password": hashPwd
      })

      done(null, newUser)

      }catch(err) {
        console.log(err)
        done(err, null)
      }
    }
  )
)

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      
      if(!email || !password) done(new Error('Bad Request, Missing credentials'), null)

      const userFound = await User.findOne({email: email.toLowerCase()}).exec()
      if(!userFound) resizeBy.send(401).json({
        status: "Bad Request",
        data: {"data": "user not found"}
      })
      try{
        matchpwd = bcrypt.compare(password, userFound.password)
        if(!matchpwd) return res.status(401);
        done(null, userFound) //it will serialize from here

      }catch(err) {
        console.log(err)
        done(err, null)
      }
    }
  )
)
