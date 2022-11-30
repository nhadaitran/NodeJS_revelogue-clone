const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true,
  },
  slug: {
    type: String,
    require: true,
  },
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    default: null,
    ref: "category",
  },
  status: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;
