const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Service extends Model {}

    Service.init({
        serviceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        serviceName: {
            type: DataTypes.STRING(45), // in DB its VARCHAR
            allowNull: false,
            unique: true
        },
        serviceDescription: {
            type: DataTypes.STRING(255), // in DB its VARCHAR
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Service',
        tableName: 'Services',
        timestamps: false
    });
    return Service;
}