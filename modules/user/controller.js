const model = require('./model');
const jwt = require('jsonwebtoken');
const config = require('../../configs');

module.exports = {
    login: (req, res) => {
        model.findOne({ email: req.body.email }, (err, user) => {
            if (err) res.status(500).send({ msg: err.message });
            if (user) {
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if (err) res.status(500).send({ msg: err.message });
                    if (isMatch) {
                        let token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 })
                        res.status(200).send({ token: token });
                    } else {
                        res.status(500).send({ msg: 'Password incorrect' });
                    }
                });
            } else {
                res.status(500).send({ msg: 'User not found' })
            }
        });
    },
    register: async (req, res) => {
        let newUser = new model({
            fullname: req.body.fullname,
            username: req.body.username,
            role: req.body.role,
            sex: req.body.sex,
            email: req.body.email,
            password: req.body.password,
        })
        try {
            const user = await newUser.save()
            let token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 })
            res.status(200).send({ token: token });
        } catch (err) {
            let msg = err.message;
            if ("username" in err.keyValue) {
                msg = "Username already in use. Please try again"
            } else if ("email" in err.keyValue) {
                msg = "Email already in use. Please try again"
            }
            res.status(500).send({ error: msg });
        }
    },
    update: async (req, res) => {
        try {
            const data = await model.findById(req.params.id);
            if (req.file) {
                if (data.image_name) {
                    let filename = data.image_name;
                    await cloudinary.uploader.destroy(filename);
                }
                req.body.image_url = req.file.path;
                req.body.image_name = req.file.filename;
            }
            await data.updateOne(req.body);
            res.status(200).send(true);
        } catch (err) {
            res.status(500).send(false);
        }
    }
}