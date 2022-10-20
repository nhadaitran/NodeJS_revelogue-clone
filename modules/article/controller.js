const cloudinary = require('cloudinary').v2;
const model = require('./model');

module.exports = {
    getAll: async (req, res) => {
        try {
            const data = await model.find().populate('writer')
            res.status(200).send(data);
        } catch (err) {
            res.status(500).send(null);
        }
    },
    getByWriter: async (req, res) => {
        try {
            const data = await model.find({ writer: req.params.id }).populate('writer')
            res.status(200).send(data);
        } catch (err) {
            res.status(500).send(null);
        }
    },
    getByCategory: async (req, res) => {
        try {
            const data = await model.find({ category: req.params.id }).populate('category')
            var slug = data[0].category.slug
            var articles = {}
            articles[slug] = data
            res.status(200).send(articles);
        } catch (err) {
            res.status(500).send(null);
        }
    },
    getOne: async (req, res) => {
        try {
            const data = await model.findOne({ slug: req.params.slug }).populate('category writer')
            res.status(200).send(data);
        } catch (err) {
            res.status(500).send(null);
        }
    },
    insert: async (req, res, next) => {
        if (!req.file) {
            res.status(500).send({ error: "No image uploaded!" });
        }
        let newArticle = new model({
            title: req.body.title,
            slug: req.body.slug,
            content: req.body.content,
            status: req.body.status,
            image_url: req.file.path,
            image_name: req.file.filename
        })
        newArticle.writer = req.body.writer;
        newArticle.category = req.body.category;
        try {
            const result = await newArticle.save();
            res.status(200).send({ article: result });
        } catch (err) {
            res.status(500).send(err);
        }
    },
    update: async (req, res) => {
        try {
            const data = await model.findById(req.params.id);
            if (req.file) {
                let filename = data.image_name;
                await cloudinary.uploader.destroy(filename);
                req.body.image_url = req.file.path;
                req.body.image_name = req.file.filename;
            }
            await data.updateOne(req.body);
            res.status(200).send(true);
        } catch (err) {
            res.status(500).send(false);
        }
    },
    delete: async (req, res) => {
        try {

            const data = await model.findById(req.params.id);
            let filename = data.image_name;
            await data.deleteOne();
            await cloudinary.uploader.destroy(filename);
            res.status(200).send(true);
        } catch (err) {
            res.status(500).send(false);
        }
    }
}