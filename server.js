const express = require('express');
const cors = require('cors');
require('dotenv').config();
const postRoutes = require('./src/routes/posts');
const authRoutes = require('./src/routes/auth');

const app = express();

app.use(cors());
app.use(express.json());


//Router
app.use('/api/auth', authRoutes);


app.get('/', (req,res)=>{
    res.send('hello...')

})

const port = process.env.APP_PORT || 3000
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})