module.exports = {
    port: process.env.PORT || 3001,
    mongo_uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/revelogue',
    secret: process.env.SECRET || "revelogue by nhadaitran",
}