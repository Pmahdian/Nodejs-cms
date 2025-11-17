const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Category = sequelize.define('Category',{
    name : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    description : {
        type : DataTypes.TEXT,
        allowNull : true
    }
},
{
    tableName : 'categories',
    timestamps : true,
    underscored : true,
    createdAt : 'created_at',
    updatedAt : false
})

module.exports = Category;