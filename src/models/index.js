'use strict'

const path = require('path')

const {DB_HOST, DB_PORT, DB_BASE, DB_USER, DB_PASS} = process.env
console.log(DB_BASE, DB_USER, DB_PASS, {
  dialect: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
})
const Sequelize = require('sequelize')
const sequelize = new Sequelize(DB_BASE, DB_USER, DB_PASS, {
  dialect: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  sync: {force: true}, // todo env
})

require('pg').defaults.parseInt8 = true

const models = {
  TransCom: sequelize.import(path.join(__dirname, 'transCom'))
}

module.exports = (async () => {
  await sequelize.sync({force: true}) // todo env

  return models
})()