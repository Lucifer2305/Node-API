const fs = require("fs/promises");
const express = require('express');
const cors = require("cors");
const _ = require("lodash");
const { v4: uuid } = require("uuid");
const mongoose = require('mongoose')
const User = require('./models/userModel');
const req = require("express/lib/request");
const app = express()

app.use(express.json())

// Routes


// saving user data in mongoDB
app.post('/user', async(req, res) => {
    try{

        const user = await User.create(req.body)
        res.status(200).json(user);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


// fetching user data by name and user ID from mongodb
app.get('/user/:name/:userID', async(req, res) =>{
    try{
        const {name} = req.params;
        const {userID} = req.params;
        const user = await User.find({name, userID},{ _id: 0, time: true, status: true, location: true})
        res.status(200).json(user)
    }catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


// update the fields in the mongoDB
app.put('/user/:name/:userID', async(req, res) =>{
    try{
        const {name} = req.params;
        const {userID} = req.params;
        const { status } = req.body;
        const updatedUser = await User.findOneAndUpdate(
            { name, userID },
            { status },
            { new: true }
          );
        
        
        if (!updatedUser){
            return res.status(404).json({message: `cannot find user with user ID ${userID}`})
        }
        const Updateduser2 = await User.find({name, userID},{ _id: 0, time: true, status: true, location: true})
        
        res.status(200).json(updatedUser)
    }catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})





// Connect to MongoDB Atlas database using Mongoose ORM.  Replace the connection string with your own
mongoose.
connect('mongodb+srv://admin:admin12345@cluster0.wwstlyi.mongodb.net/node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log('API is running on port 3000')
    })
}).catch((error) => {
    console.log(error)
})