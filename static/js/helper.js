export function newBigNotification (data) {
  const h3 = data.type === 'houston' ? `Houston, we have a problem!` : `New ${data.type} added`

  const div = document.createElement('div')
  div.classList.add('notification')

  let runType
  if (data.runType) {
    runType = `
      <div class="notification-row">
        <p>Run type: </p><p>${data.runType}</p>
      </div>
    `
  };

  div.innerHTML = `
  <div class="notification-header ${data.type}" style="color: ${data.textColor}">
    <h3>${h3}</h3>
    <button name="delete notification" class="button--delete-notification">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="${data.textColor}" d="M19 13H5v-2h14v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
    </button>
  </div>

  <div class="notification-row notification-row--first">
    <p>Message: </p><p>${data.title}</p>
  </div>
  ${!runType ? '' : runType}
  <div class="notification-row">
    <p>Time: </p><p>${data.time}</p>
  </div>
  `

  return div
}

export function newNotification (data) {
  const h3 = data.type === 'houston' ? `Houston, we have a problem!` : `New ${data.type} added`

  let runType
  if (data.runType) {
    runType = `
      <div class="notification-row">
        <p>Run type: </p><p>${data.runType}</p>
      </div>
    `
  }

  return `
    <div class="notification-header ${data.type}" style="color: ${data.textColor}">
      <h3>${h3}</h3>
      <button name="button" class="button--close-notification">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="${data.textColor}" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
      </button>
    </div>

    <div class="notification-row notification-row--first">
      <p>Message: </p><p>${data.title}</p>
    </div>
    ${!runType ? '' : runType}
    <div class="notification-row">
      <p>Time: </p><p>${data.time}</p>
    </div>
  `
}

export function updateNotifIcon (icon, count) {
  if (count !== 0) {
    icon.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="#fff" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
        <circle fill="#d60000" cx="17.7" cy="6.3" r="6.3" />
        <text fill="#fff" font-size="12px" transform="matrix(1 0 0 1 14.5306 10.1684)">${count}</text>
      </svg>
    `
  } else {
    icon.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="#fff" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
      </svg>
    `
  }
}
