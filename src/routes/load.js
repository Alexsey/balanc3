'use strict'

const {aTry} = require('../utils')
const {etherscan} = require('../services')

const {testAddress} = require('../../config').etherscan
const {Transaction, Account} = require('../models')

module.exports = async ctx => {
  const {address = testAddress} = ctx.query
  const [account] = await Account.findOrCreate({where: {address}})

  const [[balanceError, balance], [transactionsError, transactions]] = await Promise.all([
    aTry(etherscan.getBalance, account),
    aTry(etherscan.loadTransactions, account)
  ])

  if (balanceError) {
    const error = {error: balanceError, public: 'failed to load balance'}
    ctx.errors = [...ctx.errors || [], error]
  } else {
    account.update({balance})
  }

  if (transactionsError) {
    const error = {error: transactionsError, public: 'failed to load transactions'}
    ctx.errors = [...ctx.errors || [], error]
  }
}