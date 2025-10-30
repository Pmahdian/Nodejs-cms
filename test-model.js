const { sequelize } = require("./config/sequelize");
const User = require('./models/User');

async function testModel() {
    try {
        console.log('🔌 Connecting to database...');

        // Step 1: Connection test
        await sequelize.authenticate();
        console.log('✅ Connected to the database!');

        // Step 2: Sync model with database
        await User.sync();
        console.log('✅ User model synced with database.');

        // Step 3: Create test user
        const testUser = await User.create({
            username: 'testuser' + Date.now(), // Make it unique
            email: 'test' + Date.now() + '@example.com',
            password: '123456'
        });
        console.log('✅ Test user created with ID:', testUser.id);

        console.log('🎉 All tests successful! ORM is working!');

        // Exit the process
        process.exit(0);
        
    } catch (error) {
        // Error handling
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Call the function
testModel();