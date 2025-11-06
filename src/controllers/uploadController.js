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

    }
})