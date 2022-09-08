const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();

const config = require('./configs');
const db = require('./configs/database');
const initWebRouters = require('./routes')

const cors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors);

initWebRouters(app);

app.listen(config.port);