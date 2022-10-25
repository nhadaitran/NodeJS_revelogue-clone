const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const cors = require('cors')

const config = require('./configs');
const db = require('./configs/database');
const initWebRouters = require('./routes')

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true,
}))
initWebRouters(app);

app.listen(config.port);