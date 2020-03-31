const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('running bossque')
})

app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`PORT: ${port} RUNNING !!`)
})