const redis = require('ioredis')
const config = require('./index')
const client = redis.createClient({
    socket: {
        port: config.redis_port,
        host: config.redis_host
    },
    password: config.redis_pass
});

//Redis Flow
client.on('error', function (err) {
    console.error(err);
})

client.on('connect', function (err) {
    console.log('Redis Connected');
})

client.on('ready', function (err) {
    console.log('Redis Ready');
})

client.ping((err, pong) => {
    console.log(pong)
})

module.exports = client;