const { DataTypes } = require('sequelize');
const { sequelize } = require("../config/sequelize");


const Comment = sequelize.define('Comment', {
    content : {
        type : DataTypes.TEXT,
        allowNull : false,
        validate : {
            notEmpty : true
        }
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
        underscored : true,
        createdAt : 'created_at',
        updatedAt : 'updated_at'

    
});

module.exports = Comment;