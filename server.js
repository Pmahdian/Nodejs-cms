const express = require('express');
const cors = require('cors');
require('dotenv').config();
const postRoutes = require('./src/routes/posts');
const authRoutes = require('./src/routes/auth');
const categoriesRoutes = require('./src/routes/categories');
const userRoutes = require('./src/routes/users');

const app = express();

app.use(cors());
app.use(express.json());


//Router
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req,res)=>{
    res.send('hello...')

})

const port = process.env.APP_PORT || 3000
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})