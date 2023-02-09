const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000

app.use(cors())

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/images/test.jpeg")
});

app.get('/messagefromCS361', (req, res) => {
  res.send('A message from CS361!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})