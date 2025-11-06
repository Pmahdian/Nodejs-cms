const multer = require('multer');
const path =require('path');

// =============================================
// (Storage Configuration)
// =============================================


//Where to save it?
const storage = multer.diskStorage({
    destination : function
})