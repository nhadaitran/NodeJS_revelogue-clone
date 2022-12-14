const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const cors = require('cors')
const config = require('./configs');
const db = require('./configs/database');
const initWebRouters = require('./routes')

// const cors = (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     next();
// }

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors({
    // origin: 'http://localhost:3000',
    origin: true,
    credentials:true,
}))
app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })  

initWebRouters(app);

app.listen(config.port);