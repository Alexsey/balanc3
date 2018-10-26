'use strict'

const {promisify} = require('util')

const app = new (require('koa'))

const {port} = require('../config')

;(async () => {
  await require('./models')
  const routes = require('./routes')
  const responses = require('./middlewares')

  await promisify(app
    .use(responses.response)
    .use(routes.routes())
    .listen.bind(app, port))()

  console.log(`Server started on port ${port}`)
})()