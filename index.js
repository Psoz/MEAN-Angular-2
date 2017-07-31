
const express = require('express');

const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const authentication =  require('./routes/authentication')(router);
const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
mongoose.connect(config.uri,(err) => {
    if(err){
        console.log('Could NOT connect to database: ', err);
    }else{
        console.log('connected to database ' + config.db)
    }
});

app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/Client/dist/'));
app.use('/authentication', authentication);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/Client/dist/index.html'));
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
});