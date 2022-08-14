const model = require('./model');
const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = {
    login: (req, res) => {
        model.findOne({ email: req.body.email }, (err, user) => {
            if (err) throw err;
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    let token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 })
                    res.status(200).send({token: token });
                } else {
                    res.status(500).send({ msg: 'Password incorrect' });
                }
            });
        });
    },
    register: (req, res) => {
        let newUser = new model({
            fullname: req.body.fullname,
            username: req.body.username,
            role: req.body.role,
            email: req.body.email,
            password: req.body.password,
        })
        newUser.save()
            .then((result) => {
                res.status(200).send({ user_id: result._id });
            }).catch((err) => {
                res.status(500).send({ msg: "Failed" });
            })
    }
}