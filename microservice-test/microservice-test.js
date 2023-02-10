const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000

const colors = [
  {
    color: 'blue',
    width: '200px',
    height: '200px',
    url: 'https://firebasestorage.googleapis.com/v0/b/avatar-microservice.appspot.com/o/images%2Favatar-blue.jpgb76894f6-d37f-4517-a0b0-3d9a04e35059?alt=media&token=0a17b7b4-f371-4c10-8d7b-6ace6083dbb5'
  },
  {
    color: 'green',
    width: '200px',
    height: '200px',
    url: 'https://firebasestorage.googleapis.com/v0/b/avatar-microservice.appspot.com/o/images%2Favatar-green.jpg415c0a29-2179-45f4-86a7-8867bdc3af79?alt=media&token=14b97512-5263-4117-8037-ebf503cf7c50'
  },
  {
    color: 'yellow',
    width: '200px',
    height: '200px',
    url: 'https://firebasestorage.googleapis.com/v0/b/avatar-microservice.appspot.com/o/images%2Favatar-yellow.jpg869a4ce1-e2ce-495e-a472-8133ea52fdc6?alt=media&token=323037b3-fbfa-42d3-a19b-0479b71efd1a'
  },
  {
    color: 'pink',
    width: '200px',
    height: '200px',
    url: 'https://firebasestorage.googleapis.com/v0/b/avatar-microservice.appspot.com/o/images%2Favatar-pink.jpgc564ec1c-2b5d-424f-9016-0f5b6755f2fb?alt=media&token=464fc3db-5ff8-4560-bac7-caba37c3a833'
  },
  {
    color: 'orange',
    width: '200px',
    height: '200px',
    url: 'https://firebasestorage.googleapis.com/v0/b/avatar-microservice.appspot.com/o/images%2Favatar-orange.jpgaacb1eb4-09eb-4737-9252-6376359c8869?alt=media&token=e9f30723-f416-4e20-b2e2-787158dd6759'
  },
  {
    color: 'red',
    width: '200px',
    height: '200px',
    url: 'https://firebasestorage.googleapis.com/v0/b/avatar-microservice.appspot.com/o/images%2Favatar-red.jpg1f75e73e-6ac7-4992-ab69-d50e00d5dfe0?alt=media&token=253f089a-430c-4b3c-9ec5-21e80b48f105'
  }
]

app.use(cors())

app.get('/', function (req, res) {
  res.send('home')
});

app.get('/:color', function (req, res) {
  const color = req.params.color;
  switch (color) {
    case 'random':
      const arrIndex = Math.floor(Math.random() * 6)
      res.send(colors[arrIndex])
      break;
    case 'blue':
      res.send(colors[0]);
      break;
    case 'green':
      res.send(colors[1])
      break;
    case 'yellow':
      res.send(colors[2])
      break;
    case 'pink':
      res.send(colors[3])
      break;
    case 'orange':
      res.send(colors[4])
      break;
    case 'red':
      res.send(colors[5])
      break;
  }
  res.send('')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})