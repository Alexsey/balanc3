'use strict'

const rawEnv = require('dotenv').config().parsed
const env = require('dotenv-parse-variables')(rawEnv)

module.exports = {
  port: env.PORT || 5000,
  db: {
    shouldPurgeOnStart: env.DB_SHOULD_PURGE_ON_START,
    host: env.DB_HOST,
    port: env.DB_PORT,
    base: env.DB_BASE,
    user: env.DB_USER,
    pass: env.DB_PASS,
  },
  etherscan: {
    apiUrl: 'https://api.etherscan.io/api',
    apiKey: env.API_KEY,
    testAddress: '0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a',
    transactionsChunkSize: 10000
  }
}