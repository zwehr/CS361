const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000

const colors = [
  {
    color: 'blue',
    width: '200px',
    height: '200px',
    url: 'https://firebasestorage.googleapis.com/v0/b/avatar-microservice.appspot.com/o/images%2Favatar-blue.jpg?alt=media&token=29288c76-fc79-437f-89c1-05c32c859198'
  },
  {
    color: 'green',
    width: '200px',
    height: '200px',
    url: 'https://firebasestorage.googleapis.com/v0/b/avatar-microservice.appspot.com/o/images%2Favatar-green.jpg?alt=media&token=057bcd52-565d-441d-9279-697a6247922c'
  },
  {
    color: 'yellow',
    width: '200px',
    height: '200px',
    url: 'https://firebasestorage.googleapis.com/v0/b/avatar-microservice.appspot.com/o/images%2Favatar-yellow.jpg?alt=media&token=458115df-212d-4b89-ba96-15197836f86c'
  },
  {
    color: 'pink',
    width: '200px',
    height: '200px',
    url: 'https://firebasestorage.googleapis.com/v0/b/avatar-microservice.appspot.com/o/images%2Favatar-pink.jpg?alt=media&token=fba09198-12df-48e0-ae89-5761a269b179'
  },
  {
    color: 'orange',
    width: '200px',
    height: '200px',
    url: 'https://firebasestorage.googleapis.com/v0/b/avatar-microservice.appspot.com/o/images%2Favatar-orange.jpg?alt=media&token=b40ee568-0928-46a4-81ff-a4972d01071a'
  },
  {
    color: 'red',
    width: '200px',
    height: '200px',
    url: 'https://firebasestorage.googleapis.com/v0/b/avatar-microservice.appspot.com/o/images%2Favatar-red.jpg?alt=media&token=d17e13b7-c35e-4ff2-bcca-448ab5bc219a'
  }
]

app.use(cors())

app.get('/', function (req, res) {
  res.send('Try requesting /all or a /:color (blue, green, yellow, pink, orange, red)')
});

app.get('/all', function (req, res) {
  res.send(colors)
})

app.get('/:color', function (req, res) {
  const color = req.params.color;
  switch (color) {
    case 'random':
      const arrIndex = Math.floor(Math.random() * (colors.length - 1))
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
  console.log('Microservice app listening...')
})