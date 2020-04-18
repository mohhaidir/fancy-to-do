require('dotenv').config()
const { Users } = require('../models')
const generateToken = require('../helpers/generateToken')
const comparePassword = require('../helpers/comparePassword')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class ControllerUsers {
  static register(req, res, next) {
    const user = req.body
    Users.findOne({
      where: { email: req.body.email }
    })
      .then(result => {
        if (result) {
          res.status(400).json({ msg: 'Email already taken' })
        } else {
          return Users.create(user)
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static login(req, res, next) {
    let { email, password } = req.body
    let userFound = null
    Users.findOne({ where: { email } })
      .then(user => {
        // console.log(user)
        if (user) {
          userFound = user
          // console.log(comparePassword(password, user.password))
          // console.log(password)
          // console.log(user.password)
          return comparePassword(password, user.password)
        } else {
          throw { status: 404, msg: 'Email Not Found!' }
        }
      })
      .then(result => {
        if (result) {
          let token = generateToken(userFound)
          console.log(userFound.username)
          res.status(200).json({ token, name: userFound.username })
        } else {
          console.log('masuk')
          throw { status: 400, msg: 'Wrong Password!' }
        }
      })
      .catch(err => {
        next({ status: 500, msg: 'Internal Server Error!' })
      })
  }

  static googleLogin(req, res) {
    // console.log('google controler')
    // console.log(req.body)
    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.CLIENT_ID
      // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    })
      .then(ticket => {
        const payload = ticket.getPayload();
        // console.log(payload)
        Users.findOne({
          where: {
            email: payload.email
          }
        })
          .then(data => {
            if (data) {
              return data
            } else {
              let obj = {
                username: payload.name,
                email: payload.email,
                password: process.env.CLIENT_SECRET
              }
              return Users.create(obj)
            }
          })
          .then(data => {
            if (data) {
              var token = generateToken(data)
            }
            res.status(200).json({ token: token })
          })
          .catch(err => {
            res.status(400).json(err)
          })
      })

  }
}

module.exports = ControllerUsers