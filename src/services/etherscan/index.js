'use strict'

const api = require('./api')

const transactionsChunkSize = require('../../../config')
const {Transaction} = require('../../models')

module.exports = {
  getBalance,
  loadTransactions
}

async function getBalance ({address}) {
  return api.getBalance(address)
}

async function loadTransactions (account) {
  const lastTransaction = await account.getTransactions({limit: 1, order: [['blockNumber', 'DESC']]})
  let startBlock = lastTransaction ? lastTransaction.blockNumber : 0
  let offset = 0
  let chunk = await api.getTransactions(account.address, {startBlock, offset})
  do {
    chunk.forEach(transaction => transaction.accountId = account.id)
    const savePromise = Transaction.bulkCreate(chunk)
    const fetchPromise = api.getTransactions(account.address, {startBlock, offset})
    ;[chunk] = await Promise.all([fetchPromise, savePromise])
    offset += chunk.length
  } while (chunk.length === transactionsChunkSize)
}