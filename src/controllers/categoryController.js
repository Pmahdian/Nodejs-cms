const pool = require('../config/database');

const getAllCatgories = async (req, res) => {
    try {
        //step 1 : get all categories from database
        const [categories] = await pool.query(
            'select * from categories order by name ASC'
        );

        
        
    } catch (error) {
        
    }
}