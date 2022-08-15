const model = require('./model');

module.exports = {
    getAll: async (req,res) => {
        try {
            const data = await model.find().populate('writer')
            res.status(200).send(data);
        } catch (err) {
            res.status(500).send(null);
        }
    },
    getOne: async (req, res) => {
        try {
            const data = await model.findById(req.params.id)
            res.status(200).send(data);
        } catch (err) {
            res.status(500).send(null);
        }
    },
    insert: async (req, res) => {
        let newArticle = new model({
            title: req.body.title,
            slug: req.body.slug,
            content: req.body.content,
            status: req.body.status
        })
        newArticle.writer = req.body.writer;
        newArticle.category = req.body.category;
        try {
            const result = await newArticle.save()
            res.status(200).send({ article: result });
        } catch (err) {
            res.status(500).send(err);
        }
    },
    update: async (req, res) => {
        try {
            await model.findById(req.params.id).updateOne(req.body)
            res.status(200).send(true);
        } catch (err) {
            res.status(500).send(false);
        }
    },
    delete: async (req, res) => {
        try {
            await model.findById(req.params.id).deleteOne()
            res.status(200).send(true);
        } catch (err) {
            res.status(500).send(false);
        }
    }
}