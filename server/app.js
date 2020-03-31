const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const axios = require('axios')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  axios({
    method: 'get',
    url: 'http://api.openweathermap.org/data/2.5/weather?q=Jakarta,Indonesia&APPID=75b5b831f17bbb45ab72d5b025e69e5f',
  })
    .then(result => {
      res.status(200).json({ data: result.data })
    })
    .catch(err => {
      res.status(400).json(err)
    })
})

app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`PORT: ${port} RUNNING !!`)
})