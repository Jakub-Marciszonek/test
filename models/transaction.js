const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Transaction extends Model {}

  Transaction.init({
    transactionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Services',
        key: 'serviceId'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    },
    transactionName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    transactionDescription: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    transactionTimestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'Transactions',
    schema: 'CoollaCalendar',
    timestamps: false
  });

  return Transaction;
};
