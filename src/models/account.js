'use strict'

module.exports = (sequelize, {INTEGER, STRING, DECIMAL}) => {
  const Account = sequelize.define('Account', {
    id: {type: INTEGER, autoIncrement: true, primaryKey: true},
    address: {type: STRING(42), allowNull: false},
    balance: {type: DECIMAL(28)}
  }, {
    indexes: [{
      unique: true,
      fields: ['address'],
    }],
  })

  Account.associate = ({Transaction}) => {
    Account.Transaction = Account.hasMany(Transaction, {
      as: 'Transactions',
      foreignKey: 'accountId'
    })
  }

  return Account
}