/* global io */

const socket = io()
const trigger = document.getElementById('trigger-notification')

trigger.addEventListener('click', e => {
  socket.emit('trigger notification')
})

socket.on('message', msg => console.log(msg))
