const { Model, DataTypes } = require('sequelize');
// const sequelize = require(needs to be config to connection file)

class Case extends Model {}

Case.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'case'
    }
);

module.exports = Case;