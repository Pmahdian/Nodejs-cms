const { destroy } = require('../config/database');
const { Category } = require('../models/associations');
const { Op, where } = require('sequelize');

const getAllCategories = async (req, res) => {
    try {
        //step 1 : get all categories from database
        // const [categories] = await pool.query(
        //     'select * from categories order by name ASC'
        // );

        // step 1 : get all categories from DB with sequelize
        const categories = await Category.findAll({
            order : [['name', 'ASC']]
        })

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
        const existingCategory = await Category.findOne(
            {
                where : {
                    name : name
                }
            }
        )
        if (existingCategory){
            return res.status(400).json(
                {
                    success : false,
                    message : 'Category name already exists!'
                }
            );
        }

        //step 4 : insert into database
        // const [result] = await pool.query(
        //     'insert into categories (name, description) values (?, ?)',
        //     [name, description || null]
        // );

        //step 4 : insert into DB with sequelize
        const category = await Category.create({
            name : name,
            description : description || null
        })

        //step 5 : send success response
        res.status(201).json(
            {
                success : true,
                message : 'Category created successfully.',
                category : category
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
        const { id } = req.params;

        //step 2 : get data from body
        const { name, description } = req.body;

        //step 3 : validation
        if (!name && !description){
            return res.status(400).json(
                {
                    success : false,
                    message : 'you have to fill at least a field'
                }
            );
        }

        //step 4 : Cheking for duplicated names with sequelize
        if (name) {
            const existingCategory = await Category.findOne({
                where : {
                    name : name,
                    id : {[Op.ne] : id} //Op.ne = Not Equal
                }
            });
            if (existingCategory){
                return res.status(400).json(
                    {
                        success : false,
                        message : "Category name aleardy exists!"
                    }
                );
            }
        }
        
        //step 5 : update category
        // const [result] = await pool.query(
        //     'update categories set name = ?, description = ?  WHERE id = ?',
        //     [name, description, categoryId]
        // );

        //step 5 : update category with sequelize
        const updateData = {};
        if (name) {updateData.name = name};
        if (description) { updateData.description = description};

        const [affectedRows] = await Category.update(updateDate,
            {
                where :
                {
                    id : id
                }
            });

        if (affectedRows === 0) {
            return res.status(404).json({
                success : false,
                message : 'Category not found!'
            })
        }

        //step 6 : send response 
        res.status(200).json(
            {
                success : true,
                message : 'Category updated successfully.',
                name : name
            }
        )
    
        
    } catch (error) {
        //step 7 : Error handling
        console.error('Update category error:', error);
        res.status(500).json(
            {
                success : false,
                message : 'server error'
            }
        );

        
    }
}

const deleteCategory = async (req, res) => {
    try {
        //step 1 : get categoryId from req.params
        const id = req.params;

        //step 2 : checking for category existing
        const existingCategory = await Category.findOne({
            where: {id : id}
        });
        if (!existingCategory){
            return res.status(404).json(
                {
                    success : false,
                    message : 'Category not found'
                }
            )
        }
        // step 3 : delete from database
        await Category.destroy({
            where : {id : id}
        })

        // step 4 : send response
        res.status(200).json(
            {
                success : true,
                message : 'Category deleted successfully.',
                categoryId : id
            }
        )
        
    

        
    } catch (error) {
        //step 5 : Error handling
        console.error('Delete category error:', error);
        res.status(500).json(
            {
                success : false,
                message : 'Server error'
            }
        )
        
    }
}

module.exports = {getAllCategories, createCategory, updateCategory, deleteCategory}