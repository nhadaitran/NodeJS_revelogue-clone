const jwt = require('jsonwebtoken');
const config = require('../configs');
const client = require('../connections/init.redis')
const middlewareController = {
    signToken: async (id, role) => {
        return new Promise((resolve, reject) => {
            jwt.sign({ id: id, role: role }, config.secret, { expiresIn: 10800 }, (err, token) => {
                if (err) return reject(err);
                resolve(token);
            })
        })
    },
    signRefreshToken: async (id, role) => {
        return new Promise((resolve, reject) => {
            jwt.sign({ id: id, role: role }, config.refresh, { expiresIn: 604800 }, (err, token) => {
                if (err) return reject(err);
                client.set(id, token, 'EX', 604800, (err, reply) => {
                    if (err) return reject(err);
                })
                resolve(token);
            })
        })
    },
    verifyToken: async (req, res, next) => {
        if (!req.cookies.accessToken) {
            return res.status(401).send()
        }
        jwt.verify(req.cookies.accessToken, config.secret, (err, payload) => {
            if (err) {
                if (err.name == 'JsonWebTokenError') {
                    return res.status(403).send('Token Invalid');
                } else if (err.name == 'TokenExpiredError') {
                    let { id } = jwt.decode(req.cookies.accessToken)
                    client.get(id, async (err, reply) => {
                        if (err) res.status(500).send();
                        try {
                            const payloadRefreshToken = await middlewareController.verifyRefreshToken(reply)
                            await middlewareController.signRefreshToken(payloadRefreshToken.id, payloadRefreshToken.role)
                            const token = await middlewareController.signToken(payloadRefreshToken.id, payloadRefreshToken.role)
                            res.cookie('accessToken', token, {
                                httpOnly: true,
                                secure: false,
                                sameSite: 'strict'
                            })
                            req.payload = jwt.decode(token);
                            next();
                        } catch (err) {
                            if (err.name == 'JsonWebTokenError') {
                                res.status(403).send('Token Invalid');
                            } else if (err.name == 'TokenExpiredError') {
                                res.status(403).send('Token Expired');
                            }
                        }
                    });
                }
            }
            req.payload = payload;
            next();
        })
    },
    verifyRefreshToken: async (refreshToken) => {
        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, config.refresh, (err, payload) => {
                if (err) {
                    return reject(err);
                }
                resolve(payload);
            })
        })
    },
    deleteRefreshToken: async (accessToken) => {
        return new Promise((resolve, reject) => {
            let { id } = jwt.decode(accessToken)
            client.del(id, async (err, reply) => {
                if (err) return reject(err);
                resolve(reply);
            })
        })
    },
    verifyAdmin: async (req, res, next) => {
        await middlewareController.verifyToken(req, res, () => {
            try {
                if (req.payload.role == 'admin') {
                    next();
                } else {
                    res.status(403).send(false);
                }
            } catch (err) {
                if (err.name == 'JsonWebTokenError') {
                    res.status(403).send('Token Invalid');
                } else if (err.name == 'TokenExpiredError') {
                    res.status(403).send('Token Expired');
                }
            }
        })
    },
    verifyStaff: async (req, res, next) => {
        await middlewareController.verifyToken(req, res, () => {
            try {
                if (req.payload.role == 'staff') {
                    next();
                } else {
                    res.status(403).send(false);
                }
            } catch (error) {
                if (err.name == 'JsonWebTokenError') {
                    res.status(403).send('Token Invalid');
                } else if (err.name == 'TokenExpiredError') {
                    res.status(403).send('Token Expired');
                }
            }
        })
    }
}

module.exports = middlewareController;