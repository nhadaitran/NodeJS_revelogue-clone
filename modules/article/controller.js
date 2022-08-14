const model = require('./model');

module.exports = {
    insert: (req, res) => {
        let newArticle = new model({
            title: req.body.title,
            slug: req.body.slug,
            category: req.body.category,
            writer: req.body.writer,
            content: req.body.content
        })
        newArticle.save()
            .then((result) => {
                res.status(200).send({ article: result });
            }).catch(() => {
                res.status(500).send(false);
            })
    },
    update: (req, res) => {
        // let article = model.findById(req.params.id)
        // article.update(req.body)
        //     .then(() => {
        //         res.status(200).send(true);
        //     }).catch(() => {
        //         res.status(500).send(false);
        //     })
        model.findByIdAndUpdate(req.params.id,req.body)
            .then(() => {
                res.status(200).send(true);
            }).catch(() => {
                res.status(500).send(false);
            })
    },
    delete: (req, res) => {
        model.findByIdAndDelete(req.params.id)
            .then(() => {
                res.status(200).send(true);
            }).catch(() => {
                res.status(500).send(false);
            })
    }
}