const model = require('./model');

module.exports = {
    getAll: async (req,res) => {
        try {
            const data = await model.find()
            res.status(200).send(data);
        } catch (err) {
            res.status(500).send(null);
        }
    },
    getParent: async (req,res) => {
        try {
            const data = await model.find({parent:null})
            res.status(200).send(data);
        } catch (err) {
            res.status(500).send(null);
        }
    },
    getOne: async (req, res) => {
        try {
            const data = await model.findOne({slug:req.params.slug})
            res.status(200).send(data);
        } catch (err) {
            res.status(500).send(null);
        }
    },
    insert: async (req, res) => {
        let newCategory = new model({
            title: req.body.title,
            slug: req.body.slug,
            status: req.body.status,
        })
        newCategory.parent = req.body.parent;
        try {
            const data = await newCategory.save()
            res.status(200).send({ category: data });
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