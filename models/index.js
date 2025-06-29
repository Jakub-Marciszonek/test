require('dotenv').config();
const { Sequelize } = require('sequelize');

// Initialize Sequelize
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

// Import models
const User = require('./user')(sequelize);
const Coach = require('./coach')(sequelize);
const Client = require('./client')(sequelize);
const Organization = require('./organization')(sequelize);
const Service = require('./service')(sequelize);
const Event = require('./event')(sequelize);
const Feedback = require('./feedback')(sequelize);
const Specialization = require('./specialization')(sequelize);
const CoachSpecialization = require('./coachSpecialization')(sequelize);
const OperatingHours = require('./operatingHours')(sequelize);
const OperatingException = require('./operatingException')(sequelize);
const Transaction = require('./transaction')(sequelize);
const UserTransaction = require('./userTransaction')(sequelize);
const Permission = require('./permission')(sequelize);
const Role = require('./role')(sequelize);
const RolePermission = require('./rolePermission')(sequelize);
const UserRole = require('./userRole')(sequelize);

// Set up associations

// User associations
User.hasOne(Coach, { foreignKey: 'coachId' });
User.hasOne(Client, { foreignKey: 'clientId' });
User.hasOne(Organization, { foreignKey: 'organizationsId' });
User.hasMany(Feedback, { foreignKey: 'userId' });
User.hasMany(UserRole, { foreignKey: 'userId' });
User.hasMany(UserTransaction, { foreignKey: 'userId' });

// Coach associations
Coach.belongsTo(User, { foreignKey: 'coachId' });
Coach.hasMany(Event, { foreignKey: 'coachId' });
Coach.hasMany(OperatingHours, { foreignKey: 'coachId' });
Coach.hasMany(OperatingException, { foreignKey: 'coachId' });
Coach.belongsToMany(Specialization, { through: CoachSpecialization, foreignKey: 'coachId', otherKey: 'specializationId' });
Coach.hasMany(CoachSpecialization, { foreignKey: 'coachId' });

// Client associations
Client.belongsTo(User, { foreignKey: 'clientId' });
Client.belongsTo(Organization, { foreignKey: 'organizationId' });
Client.hasMany(Event, { foreignKey: 'clientId' });

// Organization associations
Organization.belongsTo(User, { foreignKey: 'organizationsId' });
Organization.hasMany(Client, { foreignKey: 'organizationId' });

// Service associations
Service.hasMany(Event, { foreignKey: 'serviceId' });
Service.hasMany(Transaction, { foreignKey: 'serviceId' });

// Event associations
Event.belongsTo(Client, { foreignKey: 'clientId' });
Event.belongsTo(Coach, { foreignKey: 'coachId' });
Event.belongsTo(Service, { foreignKey: 'serviceId' });

// Feedback associations
Feedback.belongsTo(User, { foreignKey: 'userId' });

// Specialization associations
Specialization.belongsToMany(Coach, { through: CoachSpecialization, foreignKey: 'specializationId', otherKey: 'coachId' });
Specialization.hasMany(CoachSpecialization, { foreignKey: 'specializationId' });

// CoachSpecialization associations
CoachSpecialization.belongsTo(Coach, { foreignKey: 'coachId' });
CoachSpecialization.belongsTo(Specialization, { foreignKey: 'specializationId' });

// OperatingHours associations
OperatingHours.belongsTo(Coach, { foreignKey: 'coachId' });

// OperatingException associations
OperatingException.belongsTo(Coach, { foreignKey: 'coachId' });

// Transaction associations
Transaction.belongsTo(Service, { foreignKey: 'serviceId' });
Transaction.hasMany(UserTransaction, { foreignKey: 'transactionId' });

// UserTransaction associations
UserTransaction.belongsTo(User, { foreignKey: 'userId' });
UserTransaction.belongsTo(Transaction, { foreignKey: 'transactionId' });

// Permission associations
Permission.hasMany(RolePermission, { foreignKey: 'perrmissionId' });

// Role associations
Role.hasMany(RolePermission, { foreignKey: 'roleId' });
Role.hasMany(UserRole, { foreignKey: 'roleId' });

// RolePermission associations
RolePermission.belongsTo(Role, { foreignKey: 'roleId' });
RolePermission.belongsTo(Permission, { foreignKey: 'perrmissionId' });

// UserRole associations
UserRole.belongsTo(User, { foreignKey: 'userId' });
UserRole.belongsTo(Role, { foreignKey: 'roleId' });

// Export all models and sequelize instance
module.exports = {
  sequelize,
  User,
  Coach,
  Client,
  Organization,
  Service,
  Event,
  Feedback,
  Specialization,
  CoachSpecialization,
  OperatingHours,
  OperatingException,
  Transaction,
  UserTransaction,
  Permission,
  Role,
  RolePermission,
  UserRole,
};
