const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model {}

    User.init({
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userType: {
            type: DataTypes.ENUM('Coach', 'Client', 'Organization'),
            allowNull: false
        },
        userCreatedAt: {
            type: DataTypes.DATE,// In DB its TIMESTAMP
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'Users',
        timestamps: false
    });
    return User;
}