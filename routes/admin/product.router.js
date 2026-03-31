const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product.controllers");
const validate = require("../../validates/admin/title.validate");
const multer = require('multer');
// const storageMulterHelper = require("../../helpers/storageMulter");

const upload = multer();
const uploadCloudMiddleware = require("../../middlewares/admin/uploadCloud.middleware");


router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.get("/create", controller.create);
router.post("/create", upload.single('thumbnail'), uploadCloudMiddleware.upload, validate.createPost, controller.createPost);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", upload.single('thumbnail'), uploadCloudMiddleware.upload, validate.createPost, controller.editPatch);
router.delete("/delete/:id", controller.delete);
router.get("/detail/:id", controller.detail);
module.exports = router;