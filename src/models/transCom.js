'use strict'

module.exports = (sequelize, {INTEGER, STRING, DECIMAL, ENUM, BIGINT, BOOLEAN}) =>
  sequelize.define('TransCom', {
    id: {type: INTEGER, autoIncrement: true, primaryKey: true},
    blockNumber: {type: INTEGER, allowNull: false},
    timeStamp: {type: INTEGER, allowNull: false},
    hash: {type: STRING(66), allowNull: false}, // todo hex
    from: {type: STRING(42), allowNull: false}, // todo hex
    to: {type: STRING(42)},
    value: {type: DECIMAL(28), allowNull: false, defaultValue: 0}, // todo hex
    contractAddress: {type: STRING(42)}, // todo hex
    input: {type: STRING},
    type: {type: ENUM('create', 'call')},
    gas: {type: BIGINT, allowNull: false, defaultValue: 0},
    gasUsed: {type: BIGINT, allowNull: false, defaultValue: 0},
    traceId: {type: STRING},
    isError: {type: BOOLEAN, allowNull: false, defaultValue: false},
    errCode: {type: STRING}
  })