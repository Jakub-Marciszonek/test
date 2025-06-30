const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class UserTransaction extends Model {}

  UserTransaction.init({
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'userId'
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    },
    transactionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Transactions',
        key: 'transactionId'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    }
  }, {
    sequelize,
    modelName: 'UserTransaction',
    tableName: 'UserTransactions',
    timestamps: false
  });

  return UserTransaction;
};
