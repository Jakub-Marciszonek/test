const Client = require('./client')(sequelize);//doesn't exist yet
const Coach = require('./coach')(sequelize);//doesn't exist yet
const Service = require('./service')(sequelize);//doesn't exist yet
const Event = require('./EventSeq')(sequelize);

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

module.exports = { Client, Coach, Service, Event };
