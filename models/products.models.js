const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  status: String,
  deleted: {
    type: Boolean,
    default: false
  },
  discountPercentage: Number,
  stock: Number,
  position: Number,
  slug: {
    type: String,
    slug: "title",
    unique: true
  }
}, {
  timestamps: true
});

const Products = mongoose.model("Products", productSchema, "products");
module.exports = Products;