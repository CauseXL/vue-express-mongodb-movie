const express = require('express')
const router = express.Router()
const Movie = require('../models/movie')

// 查询所有电影
router.get('/movie', (req, res) => {
  Movie.find({}).sort({ update_at: -1 })
       .then(movies => res.json(movies))
       .catch(err => res.json(err))
  // res.send("sss")
})

// 通过ObjectId查询单个电影
router.get('/movie/:id', (req, res) => {
  Movie.findById(req.params.id)
       .then(movie => res.json(movie))
       .catch(err => res.json(err))
})

// 添加一部电影
router.post('/movie', (req, res) => {
  Movie.create(req.body, (err, movie) => {
    if (err) {
      res.json(err)
    } else {
      res.json(movie)
    }
  })
})

//更新一部电影
router.put('/movie/:id', (req, res) => {
  Movie.findOneAndUpdate({ _id: req.params.id }, {
    $set: {
      title: req.body.title,
      rating : req.body.rating,
      poster : req.body.poster,
      introduction : req.body.introduction
    }
  }, {new: true})
       .then(movie => res.json(movie))
       .catch(err => res.json(err))
})

//删除一部电影
router.delete('/movie/:id', (req, res) => {
  Movie.findOneAndRemove({ _id: req.params.id })
       .then(movies => res.send(`${movie.title}删除成功`))
       .catch(err => res.json(err))
})

module.exports = router