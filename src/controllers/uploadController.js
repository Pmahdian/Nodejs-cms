const multer = require('multer');
const path =require('path');

// =============================================
// (Storage Configuration)
// =============================================
const storage = multer.diskStorage({
    destination : function (req, file, cb) { //cb=callback func
        cb(null, 'uploads/');

    },
    //filrname function specifies whrat the file name should be
    filename : function (req, file, cb){
        //create a unique name to prevent overwriting
        const uniqueName = Date.now() + '_' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, uniqueName)

    }
});

// =============================================
// File Type Filter
// =============================================


const fileFilter = (req, file, cd) =>{
    if (file.mimtype.startWith('image/')){
        // if it was a photo file, accept it
        cb(null, true);

    }else {
        // if it wasn't a photo file, returen an error
        cb(new Error('Only image files are allowed!'), false);
    }
};

// =============================================
// Create Multer instance
// =============================================

const upload = multer({
    storage : storage,
    fileFilter : fileFilter,
    limits : {
        fileSize : 5 * 1024 * 1024 //max 5 MB
    }
});


// =============================================
// The main function of uploading photos
// =============================================

const uploadImage = async(req, res) => {
    try {
        // Check that the user actually uploaded the file
        if (!req.file) {
            return res.status(400).json({
                success : false,
                message : 'Please select a photo to upload'
            });
        }


        // Create a full URL to access the image
        // req.protocol = 'http' or 'https'
        // req.get('host') = 'localhost:3000'
        // req.file.filename = generated file name
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        
    } catch (error) {
        
    }
}