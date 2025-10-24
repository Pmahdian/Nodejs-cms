const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json());


//Router
app.use('/api/auth', require('./src/routes/auth'));


app.get('/', (req,res)=>{
    res.send('hello...')

})

const port = process.env.APP_PORT || 5500
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})