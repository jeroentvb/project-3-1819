/* global localStorage */

function addNotification (data) {
  if ('localStorage' in window) {
    const previousItem = localStorage.getItem('notifications')

    if (previousItem) {
      const prevData = JSON.parse(previousItem)
      prevData.push(data)
      localStorage.setItem('notifications', JSON.stringify(prevData))
    } else {
      localStorage.setItem('notifications', JSON.stringify([ data ]))
    }
  }
}

function retrieveNotifications () {
  if ('localStorage' in window) {
    const notifications = localStorage.getItem('notifications')

    return JSON.parse(notifications)
  }
}

function updateNotifications (e) {
  if ('localStorage' in window) {
    const deleteNotification = e.lastChild.previousElementSibling.lastChild.previousElementSibling.textContent
    let notifications = JSON.parse(localStorage.getItem('notifications'))

    const updatedNotifications = notifications.filter(notification => {
      if (notification.time === deleteNotification) {
        return false
      } else {
        return true
      }
    })

    localStorage.setItem('notifications', JSON.stringify(updatedNotifications))
  }
}

function clearNotifications () {
  if ('localStorage' in window) {
    localStorage.clear()
  }
}

export const ls = {
  addNotification,
  retrieveNotifications,
  updateNotifications,
  clearNotifications
}
