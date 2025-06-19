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

// Import all models
const User = require('./user')(sequelize);
const Coach = require('./coach')(sequelize);
const Client = require('./client')(sequelize);
const Organization = require('./organization')(sequelize);
const Service = require('./service')(sequelize);
const Event = require('./event')(sequelize);

// Set up associations

// User associations
User.hasOne(Coach, { foreignKey: 'coachId' });
User.hasOne(Client, { foreignKey: 'clientId' });
User.hasOne(Organization, { foreignKey: 'organizationsId' });

// Coach associations
Coach.belongsTo(User, { foreignKey: 'coachId' });
Coach.hasMany(Event, { foreignKey: 'coachId' });

// Client associations
Client.belongsTo(User, { foreignKey: 'clientId' });
Client.belongsTo(Organization, { foreignKey: 'organizationId' });
Client.hasMany(Event, { foreignKey: 'clientId' });

// Organization associations
Organization.belongsTo(User, { foreignKey: 'organizationsId' });
Organization.hasMany(Client, { foreignKey: 'organizationId' });

// Service associations
Service.hasMany(Event, { foreignKey: 'serviceId' });

// Event associations
Event.belongsTo(Client, { foreignKey: 'clientId' });
Event.belongsTo(Coach, { foreignKey: 'coachId' });
Event.belongsTo(Service, { foreignKey: 'serviceId' });

// Export models and sequelize instance
module.exports = {
  sequelize,
  User,
  Coach,
  Client,
  Organization,
  Service,
  Event,
};