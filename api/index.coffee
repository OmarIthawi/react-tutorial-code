express = require 'express'
cors = require 'cors'
bodyParser = require 'body-parser'

MongoClient = require('mongodb').MongoClient

app = express()
app.use(cors())
app.use(bodyParser.json())

comments = null  # Declate variable at module scope

getComments = (req, res) ->
  comments.find().toArray (err, result) ->
    return res.status(500).send 'Error in DB' if err

    return res.send result.map (comment) ->
      comment.id = comment._id
      delete comment._id
      comment

app.get '/api/comments', (req, res) ->
  getComments(req, res)

app.post '/api/comments', (req, res) ->
  if req.body.text and req.body.author

    comment =
      author: req.body.author
      text: req.body.text

    comments.insertOne comment, (err, _result) ->
      return res.status(500).send 'Error in DB' if err

      getComments(req, res)


MongoClient.connect process.env.MONGO_URI, (err, db) ->
  throw err if err

  comments = db.collection('comments')

  server = app.listen process.env.PORT, ->
      {address, port} = server.address()
      console.log 'Example app listening at http://%s:%s', address, port
