const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');


const User = sequelize.define('User', {
    // define username field
    username : {
        type : DataTeypes.STRING,
        allowNull : false,
        uniqie : true
    },
    
})