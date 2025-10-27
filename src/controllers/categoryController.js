const pool = require('../config/database');

const getAllCategories = async (req, res) => {
    try {
        //step 1 : get all categories from database
        const [categories] = await pool.query(
            'select * from categories order by name ASC'
        );

        //step 2 : send response 
        if (categories.length === 0){
            return res.status(200).json({
                success : true,
                message : 'there is no category',
                categories: []  

            })
        }
        res.status(200).json(
            {
                success : true,
                message : 'this is categories',
                count : categories.length,
                categories : categories
            }
        )

        
        
    } catch (error) {
        // step 3: error handling
        console.error('Get categories error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
        
    }
};

const creatCategory = async (req, res) => {
    try {
        // step 1 : get data from body
        const {name, description} = req.body;

        //step 2 : validation
        if (!name){
            return res.status(400).json(
                {
                    success : false,
                    message : 'Category name is required'
                }
            );
        }

        //step 3 : Cheking for duplicated names
        const [existingCategories] = await pool.query(
            'select id from categories where name = ?',
            [name]
        );
        if (existingCategories.length > 0){
            return res.status(400).json(
                {
                    success : false,
                    message : 'Category name already exists!'
                }
            );
        }


        
        
    } catch (error) {
        
    }
}

module.exports = {getAllCategories}