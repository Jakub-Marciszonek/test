const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Event extends Model {}

  Event.init({
    eventId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Clients', // table name
        key: 'clientId'
      }
    },
    coachId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Coaches',
        key: 'coachId'
      }
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Services',
        key: 'serviceId'
      }
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventDescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    eventDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    attachments: {
      type: DataTypes.STRING,
      allowNull: true
    },
    attendance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isIn: [[0, 1]]
      }
    },
    eventLocation: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'On site'
    }
  }, {
    sequelize,
    modelName: 'Event',
    tableName: 'Events',
    timestamps: false // Set to true if createdAt/updatedAt columns exist
  });

  return Event;
};
