const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Post = sequelize.define('Post',{
    title : {
        type : DataTypes.STRING,
        allowNull : false
    },
    content : {
        type : DataTypes.STRING,
        allowNull : false
    },
    user_id : {
        type : DataTypes.INTEGER,
        allowNull : false,

    },
    category_id : {
        type : DataTypes.INTEGER,
        allowNull : true
    }
}, 
    {
        tableName : 'posts',
        timestamps : true,
        underscored : true,
        createdAt : 'created_at',
        updatedAt : 'updated_at'

    }
);