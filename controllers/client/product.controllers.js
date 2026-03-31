const Products = require("../../models/products.models.js");
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  };
  const records = await Products.find(find);
  if (records.length > 0) {
    records.forEach(item => {
      item.new_price = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
    });
  }
  console.log(records);
  res.render("client/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    records: records
  });
}

// [GET] /products/:slug
module.exports.detail = async (req, res) => {
  const find = {
    deleted: false,
    slug: req.params.slug
  };
  const product = await Products.findOne(find);
  res.render("client/pages/products/detail.pug", {
    pageTitle: "Chi tiết sản phẩm",
    product: product
  });
}