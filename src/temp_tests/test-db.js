const pool = require('./src/config/database');

pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:', err);
    } else {
        console.log('✅ Database connected successfully!');
        connection.release();
    }
});