const model = require('./model');
const jwt = require('../jwt_service')
const validate = require('../../helpers/validation')

module.exports = {
    login: (req, res) => {
        const { error } = validate.loginValidate(req.body)
        if (error) {
            res.status(500).send({ msg: error.details[0].message })
        }
        model.findOne({ email: req.body.email }, (err, user) => {
            if (err) res.status(500).send({ msg: err.message });
            if (user) {
                user.comparePassword(req.body.password, async (err, isMatch) => {
                    if (err) res.status(500).send({ msg: err.message });
                    if (isMatch) {
                        let token = await jwt.signToken(user._id, user.role)
                        await jwt.signRefreshToken(user._id, user.role)
                        res.cookie('accessToken', token, {
                            httpOnly: true,
                            // secure: false,
                            secure: true,
                            // sameSite: 'strict'
                            sameSite: 'lax',
                            domain:'revelogue.vercel.app'
                        })
                        const { password, ...info } = { ...user._doc }
                        res.status(200).send({ auth: info });
                    } else {
                        res.status(403).send({ msg: 'Password incorrect' });
                    }
                });
            } else {
                res.status(403).send({ msg: 'User not exists' })
            }
        });
    },
    logout: async (req, res) => {
        try {
            if (!req.cookies.accessToken) res.status(401).send();
            await jwt.deleteRefreshToken(req.cookies.accessToken)
            res.clearCookie('accessToken')
            res.status(200).send();
        } catch (err) {
            res.status(500).send();
        }
    },
    register: async (req, res) => {
        const { error } = validate.registerValidate(req.body)
        if (error) {
            res.status(500).send({ msg: error.details[0].message })
        }
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
            let token = await jwt.signToken(user._id, user.role)
            await jwt.signRefreshToken(user._id, user.role)
            res.cookie('accessToken', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict'
            })
            const { password, ...info } = { ...user._doc }
            res.status(200).send({ auth: info });   
        } catch (err) {
            let msg = err.message;
            let status = 500;
            if ("username" in err.keyValue) {
                status = 409
                msg = "Username already in use. Please try again"
            } else if ("email" in err.keyValue) {
                status = 409
                msg = "Email already in use. Please try again"
            }
            res.status(status).send({ error: msg });
        }
    },
    getAll: async (req, res) => {
        try {
            const data = await model.find({}).select('fullname image_url image_name email sex created_at')
            res.status(200).send(data);
        } catch (err) {
            res.status(500).send(null);
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