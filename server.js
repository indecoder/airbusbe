const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');

const app = express();

const userRoutes = require('./routes/account');
const mainRoutes = require('./routes/main');

mongoose.connect(config.database, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('Connected to database')
    }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.use('/api/accounts', userRoutes);
app.use('/api', mainRoutes);

app.listen(config.port, (err, res) => {
    console.log('running on port ' + config.port);
})