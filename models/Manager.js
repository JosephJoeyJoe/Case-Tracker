const { Model, DataTypes } = require('sequelize');
// const sequelize = require(needs to be config to connection file)

class Manager extends Model {}

Manager.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },   
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'manager'
    }
);

module.exports = Manager;