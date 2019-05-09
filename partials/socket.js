const server = require('../index')
const io = require('socket.io')(server)
const helper = require('./helper')

const notification = {
  runStart: {
    title: 'A new run has just started',
    time: '',
    type: 'run',
    runType: 'PHYSICS',
    textColor: '#000'
  },
  runEnd: {
    title: 'A run has ended',
    time: '',
    type: 'run',
    runType: 'PHYSICS',
    textColor: '#000'
  },
  comment: {
    title: 'A new comment has been added to a thread',
    time: '',
    type: 'comment',
    textColor: '#fff'
  },
  houston: {
    title: 'Fire in the server room!',
    time: '',
    type: 'houston',
    textColor: '#fff'
  }
}

io.on('connection', socket => {
  console.log('User connected')

  socket.emit('message', 'you connected!')

  socket.on('trigger run start', () => {
    notification.runStart.time = helper.getDate()
    socket.broadcast.emit('notification update', notification.runStart)
  })

  socket.on('trigger run end', () => {
    notification.runEnd.time = helper.getDate()
    socket.broadcast.emit('notification update', notification.runEnd)
  })

  socket.on('trigger new comment', () => {
    notification.comment.time = helper.getDate()
    socket.broadcast.emit('notification update', notification.comment)
  })

  socket.on('trigger houston', () => {
    notification.houston.time = helper.getDate()
    socket.broadcast.emit('notification update', notification.houston)
  })

  socket.on('disconnect', () => console.log('[socket] user disconnected'))
})
