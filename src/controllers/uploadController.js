const multer = require('multer');
const path =require('path');

// =============================================
// (Storage Configuration)
// =============================================
const storage = multer.diskStorage({
    destination : function (req, file, cb) { //cb=callback func
        cb(null, 'uploads/');

    }
})