const userRouter = require('../modules/user');
const articleRouter = require('../modules/article');
const categoryRouter = require('../modules/category');

let initWebRouters = (app) => {
    app.use('/api/v1/user', userRouter);
    app.use('/api/v1/article', articleRouter);
    app.use('/api/v1/category', categoryRouter);
}

module.exports = initWebRouters;