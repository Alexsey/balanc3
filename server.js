'use strict'

require('dotenv').config()

const {inspect, promisify} = require('util')
inspect.defaultOptions.colors = true

const _ = require('lodash')
const rp = require('request-promise')

const app = new (require('koa'))
const router = new (require('koa-router'))

const port = process.env.PORT

;(async () => {
  const {TransCom} = await require('./src/models')

  router.get('/test/:entity', async ctx => {
    ctx.body = await
      (ctx.params.entity == 'ct' && getCommonTransactions()
        || ctx.params.entity == 'it' && getInternalTransactions()
        || ctx.params.entity == 'b' && getBalance())
  })

  router.get('/load', async ctx => {
    const tx = await getCommonTransactions()
    await TransCom.bulkCreate(tx)
    ctx.body = await TransCom.findAll()
  })

  await promisify(app
    .use(router.routes())
    .listen.bind(app, port))()

  console.log(`Server started on port ${port}`)
})()


async function getCommonTransactions (address) {
  const response = await rp({
    url: 'https://api.etherscan.io/api',
    qs: {
      module: 'account',
      action: 'txlist',
      address: address || '0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a',
      startBlock: 0,
      endBlock: 99999999,
      page: 1,
      offset: 10,
      sort: 'asc',
      apiKey: process.env.API_KEY
    },
    json: true,
  })

  if (response.status != '1') throw Error(JSON.stringify(response))

  return response.result
}

async function getInternalTransactions (address) {
  const response = await rp({
    url: 'https://api.etherscan.io/api',
    qs: {
      module: 'account',
      action: 'txlistinternal',
      address: address || '0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3',
      startBlock: 0,
      endBlock: 2702578,
      page: 1,
      offset: 10,
      sort: 'asc',
      apiKey: process.env.API_KEY,
    },
    json: true,
  })

  if (response.status != '1') throw Error(JSON.stringify(response))

  return response.result
}

async function getBalance (address) {
  const response = await rp({
    url: 'https://api.etherscan.io/api',
    qs: {
      module: 'account',
      action: 'balance',
      address: address || '0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a',
      tag: 'latest',
      apiKey: process.env.API_KEY,
    },
    json: true,
  })

  if (response.status != '1') throw Error(JSON.stringify(response))

  return response.result
}