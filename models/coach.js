const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Coach extends Model {}
    Coach.init({
        coachId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Users', // table name
            key: 'userId'
        }
        },
        coachName: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        coachSurname: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },        
        coachPhoneNumber: {
            type: DataTypes.STRING(16),
            allowNull: true,
            unique: true, // Ensure phone number is unique
        },
        coachEmail: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true // Validate email format
            }
        }
    }, {
        sequelize,
        modelName: 'Coach',
        tableName: 'Coaches',
        timestamps: false
    });
    return Coach
}