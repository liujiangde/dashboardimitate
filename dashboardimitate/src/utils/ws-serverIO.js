const { createServer } = require('http')
const { Server } = require('socket.io')

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  socket.on('sendMsg', (data) => {
    io.emit('pushMsg', data)
  })
})

httpServer.listen(3000, function () {
  console.log('http://127.0.0.1:8081')
})
