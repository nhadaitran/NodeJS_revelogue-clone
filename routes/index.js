const express = require('express');
const userRouter = require('../modules/user');
const articleRouter = require('../modules/article');
let router = express.Router();

let initWebRouters = (app) => {
    
    app.use('/api/user', userRouter);
    app.use('/api/article', articleRouter);

    //api get user with login
    return app.use("/", router);
}

module.exports = initWebRouters;