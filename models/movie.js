const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  poster: String,
  rating: String,
  introduction: String,
  created_at: { type: Date, defualt: Date.now },
  update_at: { type: Date, defualt: Date.now },
})

const Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie
