const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product.controllers");
const validate = require("../../validates/admin/title.validate");
const multer = require('multer');
const storageMulterHelper = require("../../helpers/storageMulter");
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const upload = multer({
  storage: storageMulterHelper()
});

router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.get("/create", controller.create);
router.post("/create", upload.single('thumbnail'), function (req, res, next) {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  async function upload(req) {
    let result = await streamUpload(req);
    console.log(result);
  }

  upload(req);
}, validate.createPost, controller.createPost);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", upload.single('thumbnail'), validate.createPost, controller.editPatch);
router.delete("/delete/:id", controller.delete);
router.get("/detail/:id", controller.detail);
module.exports = router;