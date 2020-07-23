const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

// midleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = process.env.ATLAS_URI;
// const uri = "mongodb+srv://JARVIS:jarvis123@cluster0.dlnmj.gcp.mongodb.net/jarvis?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex : true}
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

//import 
const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

app.use('./exercises' , exerciseRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`server is running on port: ${port}..`);
});