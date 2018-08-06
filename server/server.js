const
  path = require('path'),
  express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  server = express()

server.use(cors('*'))

server.use(bodyParser.json())
server.use(express.static(path.join(__dirname, '../public')))

server.use('/api/bus', require('./routes/bus'))

module.exports = server
