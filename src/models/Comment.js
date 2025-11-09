const { DataTypes } = require('sequelize');
const { sequelize } = require("../config/sequelize");
const { date } = require('joi');

const Comment = sequelize.define('Comment', {
    content : {
        type : DataTypes.TEXT,
        allowNull : false
    },
    user_id : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    post_id : {
        type : DataTypes.INTEGER,
        allowNull : false
    } },
     {
        tableName : 'comments',
        timestamps : true,
        underscored : true

    
})