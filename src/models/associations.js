const User = require('./User');
const Post = require('./Post');
const Category = require('./Category');
const Comment = require('./Comment')

User.hasMany(Post, {foreignKey : 'user_id'});
Post.belongsTo(User, {foreignKey : 'user_id'});


Category.hasMany(Post, {foreignKey : 'category_id'});
Post.belongsTo(Category, {foreignKey : 'category_id'});

User.hasMany(Comment,{foreignKey : 'user_id'});

module.exports = { User, Post, Category };