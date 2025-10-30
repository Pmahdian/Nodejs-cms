const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');


const User = sequelize.define('User', {
    // define username field
    username : {
        type : DataTeypes.STRING,
        allowNull : false,
        uniqie : true
    },
    // define eimal field
    email : {
        type : DataTeypes.STRING,
        allowNull : false, 
        uniqie : true
    },

    // define password field
    password : {
        type : DataTypes.STRING,
        allowNull : false
    }},{
    
        // table setting
        tableName : 'users',
        timestamps : true
    
    
});


module.exports = User;