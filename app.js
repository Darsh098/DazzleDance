const express = require('express');
const path = require('path');
// const fs = require('fs');
const app = express();
const port = 80;

 //EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static')); //For Serving Static Files
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine','pug') //Set The Template Engine As Pug
app.set('views',path.join(__dirname,'views')) //Set The Views Directory

//EndPoints
app.get('/',(req,res)=>{
    const params = {};

    res.status(200).render('home.pug',params);
});

//Start The Server
app.listen(port,()=>{
    console.log("App Running On Port: "+port);
});