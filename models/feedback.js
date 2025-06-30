const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Feedback extends Model {}

  Feedback.init({
    feedbackId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    feedbackType: {
      type: DataTypes.ENUM('Calendart', 'Service'), // Note: 'Calendart' matches your schema
      allowNull: false
    },
    feedbackContent: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    feedbackTimeStamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Feedback',
    tableName: 'Feedback',
    timestamps: false
  });

  return Feedback;
};
