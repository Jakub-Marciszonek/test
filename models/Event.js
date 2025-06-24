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
      allowNull: false,
      references: {
        model: 'Users', // table name
        key: 'userId'
      }
    },
    coachId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Coaches',
        key: 'coachId'
      }
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Services',
        key: 'serviceId'
      }
    },
    eventName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    eventDescription: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    eventNote: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    eventDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    startTime: {
      type: DataTypes.TIME,// TIME format is HH:MM:SS
      allowNull: false
    },
    endTime: {
      type: DataTypes.TIME,// TIME format is HH:MM:SS
      allowNull: false
    },
    eventAttendance: {
      type: DataTypes.ENUM('Present', 'Not present'),
      allowNull: true,
      defaultValue: 'Present',
    },
    eventAttachments: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    eventLocation: {
      type: DataTypes.ENUM('On-site', 'Online'),
      allowNull: false,
      defaultValue: 'On-site'
    },
    eventCreatedAt: {
      type: DataTypes.DATE, // In DB its TIMESTAMP
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
  }, {
    sequelize,
    modelName: 'Event',
    tableName: 'Events',
    timestamps: false
  });

  return Event;
};
