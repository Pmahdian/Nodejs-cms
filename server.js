const express = require('express');
const core = require('conre');
require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json());


