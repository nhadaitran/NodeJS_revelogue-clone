const redis = require('ioredis')
const client = redis.createClient({
    port: 19768,
    host: 'redis-19768.c295.ap-southeast-1-1.ec2.cloud.redislabs.com'
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