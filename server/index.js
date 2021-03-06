require('dotenv').config()

var server = require('./server')
var PORT = process.env.PORT || 3000

const http = server.listen(PORT, function () {
  console.log('Listening on port', PORT)

})

const socket = require('./sockets')(http)
server.set('socket', socket)
socket.listen(8000)
