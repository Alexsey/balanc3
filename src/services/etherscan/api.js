'use strict'

module.exports = {
  getTransactions,
  getInternalTransactions,
  getBalance,
}

const rp = require('request-promise')

const {apiUrl, apiKey} = require('../../../config').etherscan

const bigInt = Number.MAX_SAFE_INTEGER

async function getTransactions (
  address, {startBlock = 0, endBlock = bigInt, sort = 'asc', page, offset}
) {
  const response = await rp({
    url: apiUrl,
    qs: {
      module: 'account',
      action: 'txlist',
      address,
      startBlock,
      endBlock,
      ...page && {page},
      ...offset && {offset},
      sort,
      apiKey
    },
    json: true,
  })

  if (response.status != '1') throw Error(JSON.stringify(response))

  return response.result
}

async function getInternalTransactions (
  address = '0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3',
  {startBlock = 0, endBlock = bigInt, sort = 'asc', page, offset}
) {
  const response = await rp({
    url: apiUrl,
    qs: {
      module: 'account',
      action: 'txlistinternal',
      address,
      startBlock,
      endBlock,
      ...page && {page},
      ...offset && {offset},
      sort,
      apiKey,
    },
    json: true,
  })

  if (response.status != '1') throw Error(JSON.stringify(response))

  return response.result
}

async function getBalance (address) {
  const response = await rp({
    url: apiUrl,
    qs: {
      module: 'account',
      action: 'balance',
      address,
      tag: 'latest',
      apiKey,
    },
    json: true,
  })

  if (response.status != '1') throw Error(JSON.stringify(response))

  return response.result
}