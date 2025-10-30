const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const User = sequelize.define('User', {
    // define username field
    username: {
        type: DataTypes.STRING,  // ✅ تصحیح: DataTypes
        allowNull: false,
        unique: true             // ✅ تصحیح: unique
    },
    // define email field         // ✅ تصحیح: email
    email: {
        type: DataTypes.STRING,  // ✅ تصحیح: DataTypes  
        allowNull: false,
        unique: true             // ✅ تصحیح: unique
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