const { DataTypes } = require('sequelize');
const { sequelize } = require("../config/sequelize");

const Like = sequelize.define('Like', {
    user_id : {
       type: DataTypes.INTEGER,
        allowNull: false 
    },
    post_id : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    type : {
        type : DataTypes.ENUM('like', 'bookmark'),
        allowNull : false
    }
},
{
    tableName: 'likes',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Like;
