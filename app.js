const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('running bossque')
})

const routerTodos = require('./routers/routerTodos')
app.use('/todos', routerTodos)

app.listen(port, () => {
  console.log(`PORT: ${port} RUNNING !!`)
})