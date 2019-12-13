//Inject npm packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const filesSystem = require('fs');
require('dotenv/config');

//Initialize app with express package
const app = express();
app.use(express.json());
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials" : true
  }));

//Define server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => console.log('Serve is connected to the database!'));

//Route 1
const route1 = require('./routes/route1');
app.use('/route1', route1);


//schedule functions at certain times
const schedule = require('node-schedule');
schedule.scheduleJob('0 0 1 * *', async () => {

    console.log('This is a function that is called at the beginning of each month');

    //function that clears all files from a folder, but keeps the empty folder
    filesSystem.readdir(`${process.env.FILES_BASE_PATH}`, (err, files) => {

        if (err) throw err;

        files.forEach(file => {
            filesSystem.unlink(`${process.env.FILES_BASE_PATH}/${file}`, e => {
                if(e) throw e;
            });
        });
    });
}); 