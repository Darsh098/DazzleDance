const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
// const fs = require('fs');
const app = express();
const port = 80;
mongoose.connect('mongodb://127.0.0.1:27017/DazzleDance');

//Defining Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    message: String
});

const ContactUs = mongoose.model('Contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); //For Serving Static Files
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine', 'pug') //Set The Template Engine As Pug
app.set('views', path.join(__dirname, 'views')) //Set The Views Directory

//EndPoints
app.get('/', (req, res) => {
    const params = {};

    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res) => {
    let myData = new ContactUs(req.body)
    myData.save().then(() => {
        // res.send("This item has been saved to the database");
        res.render('contact.pug', { alertMessage: 'Data is sent' });
    }).catch(() => {
        res.status(400).send("Item Was Not Saved To Database");
    });
    // res.status(200).render('contact.pug');
});

//Start The Server
app.listen(port, () => {
    console.log("App Running On Port: " + port);
});