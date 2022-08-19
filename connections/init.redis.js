const redis = require('ioredis')
const client = redis.createClient({
    port: 6379,
    host: '127.0.0.1'
})
//Redis Flow
client.on('error',function(err) {
    console.error(err);
})

client.on('connect',function(err) {
    console.log('Redis Connected');
})

client.on('ready',function(err) {
    console.log('Redis Ready');
})

client.ping((err, pong) => {
    console.log(pong)
})

module.exports = client;