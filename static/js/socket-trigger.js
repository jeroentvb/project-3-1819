/* global io */

const socket = io()
const triggerRunStart = document.getElementById('trigger-run-start')
const triggerRunEnd = document.getElementById('trigger-run-end')
const triggerNewComment = document.getElementById('trigger-new-comment')
const houston = document.getElementById('trigger-houston')

triggerRunStart.addEventListener('click', () => socket.emit('trigger run start'))
triggerRunEnd.addEventListener('click', () => socket.emit('trigger run end'))
triggerNewComment.addEventListener('click', () => socket.emit('trigger new comment'))
houston.addEventListener('click', () => socket.emit('trigger houston'))

socket.on('message', msg => console.log(msg))
