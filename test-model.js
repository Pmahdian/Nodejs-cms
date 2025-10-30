const { sequelize } = require("./src/config/sequelize");
const User = require('./models/User');

async function testModel() {
    try {
        console.log('🔌 Connecting to database...');

        // step 1 : connection test
        await sequelize.authenticate();
        console.log('✅ connected to the database!');
        
    } catch (error) {
        
    }
    
}

