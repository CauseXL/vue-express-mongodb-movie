const express = require('express')

const mongoose = require('mongoose')
const index = require('./router/index')
const movie = require('./router/movie')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:27017/movielist')
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('dist'))
app.use('/', index)
app.use('/api', movie)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

module.exports = app
