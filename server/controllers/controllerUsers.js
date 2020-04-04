const { Users } = require('../models')
const generateToken = require('../helpers/generateToken')
const comparePassword = require('../helpers/comparePassword')
require('dotenv').config()
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class ControllerUsers {
  static register(req, res, next) {
    const user = req.body
    Users.create(user)
      .then(result => {
        res.status(201).json({ result: result })
      })
      .catch(err => {
        if (err.errors) {
          let errorArguments = []
          err.errors.forEach(e => {
            errorArguments.push({
              type: e.type,
              msg: e.message
            })
          });
          next({ status: 400, errors })
          res.status(400).json(error)
        } else {
          res.status(500)
        }
      })
  }

  static login(req, res, next) {
    let { email, password } = req.body;
    Users.findOne({ where: { email } })
      .then(result => {
        if (result && comparePassword(password, result.password)) {
          let token = generateToken(result)
          res.status(200).json({ token })
        } else {
          throw { status: 404, msg: 'something wrong, either email or password!' }
        }
      })
      .catch(err => {
        next(err)
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