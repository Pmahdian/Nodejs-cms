const { sequelize } = require('./src/config/sequelize');
const Comment = require('./src/models/Comment');

async function syncCommentModel() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connection established');
        
        await Comment.sync({ alter: true });
        console.log('✅ Comment model synced with database');
        
        console.log('🎉 Comment system ready!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error syncing comment model:', error);
        process.exit(1);
    }
}

syncCommentModel();