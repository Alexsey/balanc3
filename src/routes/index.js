'use strict'

const router = new (require('koa-router'))

router.get('/load', require('./load'))

module.exports = router