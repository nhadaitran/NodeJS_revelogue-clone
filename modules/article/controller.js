const cloudinary = require("cloudinary").v2;
const model = require("./model");
const modelCategory = require("../category/model");

module.exports = {
  getAll: async (req, res) => {
    try {
      const data = await model.find().populate("category writer");
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(null);
    }
  },
  getHome: async (req, res) => {
    try {
      var _idLiterature = "634e74401a167b269a662372";
      var _idCinema = "634e746c1a167b269a662374";
      var _idMusic = "634e74841a167b269a662378";
      const topview = await model
        .find({ status: true })
        .sort({ view: "desc" })
        .limit(13)
        .populate("category writer");
      const newest = await model
        .find({ status: true })
        .sort({ updated_at: "desc" })
        .limit(5);
      const newestLiterature = await model
        .find({ status: true, category: _idLiterature })
        .sort({ updated_at: "desc" })
        .limit(11)
        .populate("category writer");
      const newestCinema = await model
        .find({ status: true, category: _idCinema })
        .sort({ updated_at: "desc" })
        .limit(10)
        .populate("category writer");
      const newestMusic = await model
        .find({ status: true, category: _idMusic })
        .sort({ updated_at: "desc" })
        .limit(10)
        .populate("category writer");
      var arr = [];
      arr.push({
        trending: topview.slice(0, 5),
        trending2: topview.slice(5),
        newest: newest,
        newestL: newestLiterature,
        newestC: newestCinema,
        newestM: newestMusic,
      });
      res.status(200).send(arr);
    } catch (err) {
      res.status(400).send(null);
    }
  },
  getStatusFalse: async (req, res) => {
    try {
      const data = await model
        .find({ status: false })
        .populate("category writer");
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(null);
    }
  },
  getByWriter: async (req, res) => {
    try {
      const data = await model
        .find({ writer: req.params.id })
        .populate("category writer");
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(null);
    }
  },
  getByCategory: async (req, res) => {
    try {
      const data = await model
        .find({ category: req.params.id })
        .populate("category writer");
      var slug = data[0].category.slug;
      var articles = {};
      articles[slug] = data;
      res.status(200).send(articles);
    } catch (err) {
      res.status(500).send(null);
    }
  },
  getByCategorySlug: async (req, res) => {
    try {
      var cat = await modelCategory.findOne({ slug: req.params.slug });
      const data = await model
        .find({ category: cat._id.toString() })
        .populate("category writer");
      var slug = data[0].category.slug;
      var articles = {};
      articles[slug] = data;
      res.status(200).send(articles);
    } catch (err) {
      res.status(500).send(null);
    }
  },
  getOne: async (req, res) => {
    try {
      const data = await model
        .findOne({ slug: req.params.slug })
        .populate("category writer");
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
      image_name: req.file.filename,
    });
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
  updateStatus: async (req, res) => {
    try {
      const data = await model.findById(req.params.id);
      await data.updateOne(req.body);
      res.status(200).send(req.params.id);
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
  },
};
