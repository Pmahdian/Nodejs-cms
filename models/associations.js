const User = require('./User');
const Post = require('./Post');
const Category = require('./Category');

User.hasMany(Post, {foreignKey : 'user_id'});
Post.belongsTo(User, {foreignKey : 'user_id'});


Category.hasMany(Post, {foreignKey : 'user_id'});
Post.belongsTo(Category, {foreignKey : 'user_id'});

module.exports = { User, Post, Category };