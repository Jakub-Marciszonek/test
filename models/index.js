require('dotenv').config();
const { Sequelize } = require('sequelize');

// Initialize Sequelize with environment variables for database connection
// Ensure that the environment variables are set in your .env file
const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: process.env.DIALECT,
    logging: false,
  }
);

const Client = require('./client')(sequelize);//doesn't exist yet
const Coach = require('./coach')(sequelize);//doesn't exist yet
const Service = require('./service')(sequelize);//doesn't exist yet
const Event = require('./event')(sequelize);

// belongsTo associations means that the Event model has foreign keys that reference 
// the primary keys of the Client, Coach, and Service models.
// This allows Sequelize to understand the relationships between these models.
Event.belongsTo(Client, { foreignKey: 'clientId' });
Event.belongsTo(Coach, { foreignKey: 'coachId' });
Event.belongsTo(Service, { foreignKey: 'serviceId' });

// hasmany associations mean that the Client, Coach, and Service models can have multiple 
// Events associated with them.
Client.hasMany(Event, { foreignKey: 'clientId' });
Coach.hasMany(Event, { foreignKey: 'coachId' });
Service.hasMany(Event, { foreignKey: 'serviceId' });

module.exports = { sequelize, Client, Coach, Service, Event };
