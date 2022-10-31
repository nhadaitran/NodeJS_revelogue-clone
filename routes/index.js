const userRouter = require('../modules/user');
const articleRouter = require('../modules/article');
const categoryRouter = require('../modules/category');
const imageRouter = require('../modules/upload_image');

let initWebRouters = (app) => {
    app.use('/api/v1/user', userRouter);
    app.use('/api/v1/article', articleRouter);
    app.use('/api/v1/category', categoryRouter);
    app.use('/api/v1/upload', imageRouter);
}

module.exports = initWebRouters;