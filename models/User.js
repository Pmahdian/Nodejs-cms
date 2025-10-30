const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: true,
    underscored : true,
    createdAt : 'created_at',
    updatedAt : false
});

module.exports = User;