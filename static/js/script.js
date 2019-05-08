/* global io */

import {
  newNotification,
  newBigNotification,
  updateNotifIcon
} from './helper.js'

const socket = io()
const notification = document.getElementById('notification')
const notifications = document.getElementById('notifications')
const notificationsWrapper = document.querySelector('.notifications-wrapper')
const notifIcon = document.querySelector('.button--navigation')
const closeNotifs = document.querySelector('.close-notifications')
let notifCount = 0
let timeOut

socket.on('notification update', data => {
  if (!notifications.classList.contains('showNotif')) {
    notification.classList.remove('hideNotif')
    notification.classList.add('showNotif')

    notification.innerHTML = newNotification(data)

    timeOut = setTimeout(hideSingleNotif, 8000)

    document.querySelector('.button--close-notification').addEventListener('click', e => {
      notification.classList.remove('showNotif')
      notification.classList.add('hideNotif')

      clearTimeout(timeOut)
    })
  }

  if (document.querySelector('.empty-state')) document.querySelector('.empty-state').remove()

  notificationsWrapper.innerHTML += newBigNotification(data)
})

notifIcon.addEventListener('click', showNotifications)
closeNotifs.addEventListener('click', hideNotifications)

function showNotifications () {
  document.querySelector('.container-fluid').style.position = 'fixed'

  notifications.classList.remove('hideNotif')
  notifications.classList.add('showNotif')

  notifIcon.removeEventListener('click', showNotifications)
  notifIcon.addEventListener('click', hideNotifications)

  notifCount = 0
  updateNotifIcon(notifIcon, notifCount)
}

function hideNotifications () {
  console.log('kek')
  document.querySelector('.container-fluid').style.position = 'static'

  notifications.classList.remove('showNotif')
  notifications.classList.add('hideNotif')

  notifIcon.removeEventListener('click', hideNotifications)
  notifIcon.addEventListener('click', showNotifications)
}

function hideSingleNotif () {
  notification.classList.remove('showNotif')
  notification.classList.add('hideNotif')

  notifCount++

  updateNotifIcon(notifIcon, notifCount)
}
