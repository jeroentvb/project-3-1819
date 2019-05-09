/* global io */

import {
  newNotification,
  newBigNotification,
  updateNotifIcon
} from './helper.js'

import {
  ls
} from './localStorage.js'

const socket = io()
const notification = document.getElementById('notification')
const notifications = document.getElementById('notifications')
const notificationsWrapper = document.querySelector('.notifications-wrapper')
const notifIcon = document.querySelector('.button--navigation')
const closeNotifs = document.querySelector('.close-notifications')
let notifCount = 0
let timeOut

if ('localStorage' in window) checkNotifications()

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

  // notificationsWrapper.innerHTML += newBigNotification(data)

  notificationsWrapper.insertBefore(newBigNotification(data), document.querySelector('.notification:first-of-type'))
  document.querySelector('.button--delete-notification').addEventListener('click', deleteNotification)

  ls.addNotification(data)
})

notifIcon.addEventListener('click', showNotifications)
closeNotifs.addEventListener('click', hideNotifications)
document.querySelector('.button--delete-notifications').addEventListener('click', emptyState)

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

function deleteNotification (e) {
  if (e.path[2].classList.contains('notification')) {
    ls.updateNotifications(e.path[2])
    e.path[2].remove()
  } else {
    ls.updateNotifications(e.path[3])
    e.path[3].remove()
  }

  if (notificationsWrapper.innerHTML.trim().length === 0) {
    emptyState()
  }
}

function emptyState () {
  notificationsWrapper.innerHTML = '<p class="empty-state">You don\'t have any notifications</p>'

  ls.clearNotifications()

  notifCount = 0
  updateNotifIcon(notifIcon, notifCount)
}

function checkNotifications () {
  let previousNotifications = ls.retrieveNotifications()

  if (previousNotifications) {
    document.querySelector('.empty-state').remove()

    previousNotifications = previousNotifications.reverse()

    previousNotifications.forEach(notification => {
      notificationsWrapper.insertBefore(newBigNotification(notification), document.querySelector('.notification:first-of-type'))

      document.querySelector('.button--delete-notification').addEventListener('click', deleteNotification)
    })
  }
}
