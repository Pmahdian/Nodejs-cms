const pool = require('../config/database');  // به جای ./src/config/database

// چک کنیم مقادیر از .env درست خوانده شدن
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PASS:', process.env.DB_PASS ? '***' : 'empty');

pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:', err);
    } else {
        console.log('✅ Database connected successfully!');
        connection.release();
    }
});