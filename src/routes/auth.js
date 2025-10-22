const express = require('express');
const router = express.Router();

router.post('/register',(req,res)=>{

})

module.exports = router;



var names = ["parnian", "parnian", "amir", "reza", "sama", "sara"];
var uNames = [];

for (var i = 0; i < names.length; i++) {
    var temp = names[i];
    
    if (uNames.indexOf(temp) === -1) {
         uniqueNames.push(temp);
    }
}

