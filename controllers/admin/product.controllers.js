const Products = require("../../models/products.models");
const filterHelper = require("../../helpers/filter-status");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");

module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  };


  const objectStatus = filterHelper(req.query);
  if (req.query.status) {
    find.status = req.query.status;
  }

  // tìm kiếm
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  // end tìm kiếm

  // sắp xếp
  let sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }
  // sắp xếp


  // pagination
  const countProduct = await Products.countDocuments();
  const pagination = paginationHelper({
      currentPage: 1,
      limitItem: 5
    },
    req.query,
    countProduct
  );
  // pagination


  const records = await Products.find(find).sort(sort).limit(pagination.limitItem).skip(pagination.skip);
  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    records: records,
    pagination: pagination,
    objectStatus: objectStatus,
    keyword: req.query.keyword
  });
}

module.exports.changeStatus = async (req, res) => {
  try {
    if (req.params) {
      const id = req.params.id;
      const status = req.params.status;
      await Products.updateOne({
        _id: id
      }, {
        status: status
      });
    }
    req.flash('success', 'Cập nhật trạng thái thành công!');
    res.redirect(req.get("Referrer"));
  } catch (error) {
    req.flash('error', 'Cập nhật trạng thái thất bại!');
  }
}

module.exports.changeMulti = async (req, res) => {
  const type = req.body.option;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await Products.updateMany({
        _id: {
          $in: ids
        }
      }, {
        status: "active"
      });
      req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm`);
      break;
    case "inactive":
      await Products.updateMany({
        _id: {
          $in: ids
        }
      }, {
        status: "inactive"
      });
      req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm`);
      break;
    case "delete-all":
      await Products.updateMany({
        _id: {
          $in: ids
        }
      }, {
        deleted: true
      });
      req.flash("success", `Đã xoá thành công ${ids.length} sản phẩm`);
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        await Products.updateOne({
          _id: id
        }, {
          position: position
        });
      }
      req.flash("success", `Cập nhật vị trí thành công ${ids.length} sản phẩm`);
      break;

    default:
      break;
  }
  res.redirect(req.get("Referer"));
}

// create product
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create.pug", {
    pageTitle: "Thêm sản phẩm"
  });
}

module.exports.createPost = async (req, res) => {
  try {
    if (req.body) {
      req.body.price = parseInt(req.body.price);
      req.body.discountPercentage = parseInt(req.body.discountPercentage);
      req.body.stock = parseInt(req.body.stock);
      if (req.body.position) {
        req.body.position = parseInt(req.body.position);
      } else {
        const countProducts = await Products.countDocuments();
        req.body.position = countProducts + 1;
      }
      // if (req.file) {
      //   req.body.thumbnail = `/uploads/${req.file.filename}`;
      // }
      const product = new Products(req.body);
      await product.save();
    }
    req.flash("success", "Thêm sản phẩm thành công!");
    res.redirect(`${systemConfig.pathAdmin}/products`);
  } catch (error) {
    req.flash("error", "Thêm sản phẩm thất bại!");
  }

}
// create product

// edit product
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const find = {
      deleted: false,
      _id: id
    }
    const product = await Products.findOne(find);
    res.render("admin/pages/products/edit.pug", {
      pageTitle: "Cập nhật sản phẩm",
      product: product
    });
  } catch (error) {
    res.redirect(`${systemConfig.pathAdmin}/products`);
  }

}

module.exports.editPatch = async (req, res) => {
  if (req.body) {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);
    if (req.file) {
      req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    try {
      await Products.updateOne({
        _id: req.params.id
      }, req.body);
      req.flash("success", "Cập nhật thành công!");
    } catch (error) {
      req.flash("error", "Cập nhật thất bại!")
    }
  }
  res.redirect(req.get("Referer"));

}
// edit product

// delete product
module.exports.delete = async (req, res) => {
  try {
    await Products.deleteOne({
      _id: req.params.id
    });
    req.flash("success", "Đã xoá thành công!");
    res.redirect(req.get("Referer"));
  } catch (error) {
    req.flash("error", "Xoá thất bại!");
  }

}
// delete product

// detail product
module.exports.detail = async (req, res) => {
  const find = {
    deleted: false,
    _id: req.params.id
  };
  const product = await Products.findOne(find);
  res.render("admin/pages/products/detail.pug", {
    pageTitle: "Chi tiết sản phẩm",
    product: product
  });
}
// detail product