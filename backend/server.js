//requrements
const express = require('express');
const cors = require('cors');

//environment variable
require('dotenv').config();

//creating express server
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//staring server
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});