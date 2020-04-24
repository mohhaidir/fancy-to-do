require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
// const axios = require('axios')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('home')
})

app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`PORT: ${port} RUNNING !!`)
})