const User = require('./User');
const Post = require('./Post');
const Category = require('./Category');
const Comment = require('./Comment')
const Like = require('./Like');

User.hasMany(Post, {foreignKey : 'user_id'});
Post.belongsTo(User, {foreignKey : 'user_id'});


Category.hasMany(Post, {foreignKey : 'category_id'});
Post.belongsTo(Category, {foreignKey : 'category_id'});

User.hasMany(Comment,{foreignKey : 'user_id'});
Post.hasMany(Comment,{foreignKey: 'post_id'});
Comment.belongsTo(User, {foreignKey : 'user_id'});
Comment.belongsTo(Post,{foreignKey : 'post_id'});

User.hasMany(Like, {foreignKey : user_id});

module.exports = { User, Post, Category, Comment };