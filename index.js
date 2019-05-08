const app = require('express')

module.exports = app()
  .set('view engine', 'ejs')
  .set('views', 'templates/pages')
  .use(app.static('static'))
  // .use(bodyParser.urlencoded({
  //   extended: true
  // }))

  .get('/', index)
  .get('/trigger', trigger)

  .use(notFound)
  .listen(process.env.PORT || 3000, () => console.log(`[server] listening on port ${process.env.PORT || 3000}`))

const socket = require('./partials/socket')

function index (req, res) {
  res.render('index')
}

function trigger (req, res) {
  res.render('trigger')
}

function notFound (req, res) {
  res.status(404).render('error', {
    error: {
      status: 404,
      message: 'The page was not found.'
    }
  })
}
