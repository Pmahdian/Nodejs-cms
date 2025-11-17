const { sequelize } = require('./src/config/sequelize');
const { Like } = require('./src/models/associations');

const syncLikes = async () => {
    try {
        await Like.sync({ force: false, alter: true });
        console.log('✅ Likes table synced successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Likes sync failed:', error);
        process.exit(1);
    }
};

syncLikes();