'use strict'

const {map} = require('lodash')

module.exports = async function (ctx, next) {
  await next()

  if (ctx.body) return

  if (ctx.errors) {
    ctx.errors.forEach(console.log)
    return ctx.body = {errors: map(ctx.errors, 'public')}
  }

  ctx.body = 'OK'
}