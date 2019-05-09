function getDate () {
  const d = new Date()

  const date = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
  const time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`

  return `${time}  ${date}`
}

module.exports = {
  getDate
}
