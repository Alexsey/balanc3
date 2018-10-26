'use strict'

const path = require('path')

const {invokeMap} = require('lodash')

const shouldPurgeOnStart = {force: require('../../config').db.shouldPurgeOnStart}

const {DB_HOST, DB_PORT, DB_BASE, DB_USER, DB_PASS} = process.env
const Sequelize = require('sequelize')
const sequelize = new Sequelize(DB_BASE, DB_USER, DB_PASS, {
  dialect: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
})

require('pg').defaults.parseInt8 = true

const models = {
  Transaction: sequelize.import(path.join(__dirname, 'transaction')),
  Account: sequelize.import(path.join(__dirname, 'account')),
}

invokeMap(models, 'associate', models)
models.sequelize = sequelize

module.exports = (async () => {
  await sequelize.sync(shouldPurgeOnStart)

  Object.assign(module.exports, models)

  return models
})()