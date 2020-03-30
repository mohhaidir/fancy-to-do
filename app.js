const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('running bossque')
})

const router = require('./routes')
app.use(router)

app.listen(port, () => {
  console.log(`PORT: ${port} RUNNING !!`)
})

// const express = require('express');
// const app = express();
// const port = 3000;
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// const router = require('./routes');
// app.use(router);

// app.listen(port, () => {
//   console.log('listening on port: ', port);
// });