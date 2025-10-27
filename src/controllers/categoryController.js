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

const createCategory = async (req, res) => {
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

        //step 4 : insert into database
        const [result] = await pool.query(
            'insert into categories (name, description) values (?, ?)',
            [name, description || null]
        );

        //step 5 : send success response
        res.status(201).json(
            {
                success : true,
                message : 'Category created successfully.',
                categoryId : result.insertId,
                name : name
            }
        );

        
    } catch (error) {
        //strp 6 : Error handling
        console.error("Create category error:", error);
        res.status(500).json(
            {
                success : false,
                message : 'server error'
            }
        );
        
    }
}


const updateCategory = async (req, res) => {
    try {
        //step 1 : get categoryId from params
        const categoryId = req.params.categoryId;

        //step 2 : get data from body
        const {name, description} = req.body;

        //step 3 : validation
        if (!name && !description){
            return res.status(400).json(
                {
                    success : false,
                    message : 'you have to fill at least a field'
                }
            );
        }

        //step 4 : Cheking for duplicated names
        const [existingCategories] = await pool.query(
            'select id from categories where name = ? and id != ?',
            [name, categoryId]
        );
        if (existingCategories.length > 0){
            return res.status(400).json(
                {
                    success : false,
                    message : 'Category name already exists!'
                }
            )
        }

        //step 5 : update category
        const [result] = await pool.query(
            'update categories set name = ?, description = ?  WHERE id = ?',
            [name, description]
        );
        





        
    } catch (error) {
        
    }
}

module.exports = {getAllCategories, createCategory}