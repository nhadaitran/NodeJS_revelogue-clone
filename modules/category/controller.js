const model = require("./model");

function nestedCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parent == null);
  } else {
    category = categories.filter(
      (cat) => String(cat.parent) == String(parentId)
    );
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      title: cate.title,
      slug: cate.slug,
      status: cate.status,
      parent: cate.parent,
      created_at: cate.created_at,
      children: nestedCategories(categories, cate._id),
    });
  }
  return categoryList;
}

module.exports = {
  getAll: async (req, res) => {
    try {
      const data = await model.find();
      res.status(200).send({nested:nestedCategories(data),data});
    } catch (err) {
      res.status(400).send(null);
    }
  },
  insert: async (req, res) => {
    let newCategory = new model({
      title: req.body.title,
      slug: req.body.slug,
      status: req.body.status,
    });
    newCategory.parent = req.body.parent;
    try {
      const data = await newCategory.save();
      res.status(200).send({ category: data });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  update: async (req, res) => {
    try {
      await model.findById(req.params.id).updateOne(req.body);
      res.status(200).send(true);
    } catch (err) {
      res.status(400).send(false);
    }
  },
  delete: async (req, res) => {
    try {
      await model.findById(req.params.id).deleteOne();
      res.status(200).send(true);
    } catch (err) {
      res.status(400).send(false);
    }
  },
};
