//requrements
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//environment variable
require('dotenv').config();

//creating express server
const app = express();
const port = process.env.PORT || 5000;

//middleware
console.log(cors); // Should log the cors function
console.log(express.json); // Should log the json function

app.use(cors());
app.use(express.json());

//connecting database URL
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!");
});

//requiring and use the files
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
//staring server
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});