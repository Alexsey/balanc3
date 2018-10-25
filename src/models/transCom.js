'use strict'

module.exports = (sequelize, {INTEGER, STRING, DECIMAL}) => ({
  id: {type: INTEGER, autoIncrement: true, primaryKey: true},
  blockNumber: {type: INTEGER, allowNull: false},
  hash: {type: STRING(66), allowNull: false},
  from: {type: STRING(42), allowNull: false},
  to: {type: STRING(42)},
})