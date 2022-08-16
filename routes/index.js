const express = require('express');
const userRouter = require('../modules/user');
const articleRouter = require('../modules/article');
const categoryRouter = require('../modules/category');

let initWebRouters = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/article', articleRouter);
    app.use('/api/category', categoryRouter);
}

module.exports = initWebRouters;