
const express = require('express');

const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const authentication =  require('./routes/authentication')(router);
const blogs = require('./routes/blogs')(router);
const bodyParser = require('body-parser');
const cors = require('cors');
mongoose.Promise = global.Promise;
mongoose.connect(config.uri,(err) => {
    if(err){
        console.log('Could NOT connect to database: ', err);
    }else{
        console.log('connected to database ' + config.db)
    }
});

app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client/dist/'));
app.use('/authentication', authentication);
app.use('/blogs', blogs);

app.get('*', function (req, res) {
    if(req.error){
        console.log(req.error);
    }
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
});