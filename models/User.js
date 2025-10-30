const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const User = sequelize.define('User', {
    // define username field
    username: {
        type: DataTypes.STRING,  // ✅ 
        allowNull: false,
        unique: true             // ✅ 
    },
    // define email field         // ✅ 
    email: {
        type: DataTypes.STRING,  // ✅ 
        allowNull: false,
        unique: true             // ✅ 
    },
    // define password field
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // table setting
    tableName: 'users',
    timestamps: true
});

module.exports = User;