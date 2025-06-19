// Import all models
const User = require('./user.js')(sequelize);
const Coach = require('./coach.js')(sequelize);
const Client = require('./client.js')(sequelize);
const Organization = require('./organization.js')(sequelize);
const Service = require('./service.js')(sequelize);
const Event = require('./event.js')(sequelize);

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