const express = require('express');
const app = express();

const config = require('./config');
const db = require('./config/database');
const initWebRouters = require('./routes')

const cors = (req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','*');
    res.header('Access-Control-Allow-Headers','*');
    next();
}

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors);

initWebRouters(app);

app.listen(config.port,console.log('Server has started on http://localhost:%s', config.port));