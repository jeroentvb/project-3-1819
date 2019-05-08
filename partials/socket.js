const server = require('../index')
const io = require('socket.io')(server)

const notifications = [
  {
    title: 'Test',
    time: new Date(),
    type: 'run',
    textColor: '#000'
  },
  {
    title: 'Test',
    time: new Date(),
    type: 'comment',
    textColor: '#fff'
  }
]

io.on('connection', socket => {
  console.log('User connected')

  socket.emit('message', 'you connected!')

  socket.on('trigger notification', () => {
    socket.broadcast.emit('notification update', notifications[Math.round(Math.random())])
  })

  socket.on('disconnect', () => console.log('[socket] user disconnected'))
})
