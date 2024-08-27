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
const userSchemaRouter = require('./routes/user');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
//staring server
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});