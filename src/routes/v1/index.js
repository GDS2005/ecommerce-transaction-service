const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/multer');
const imageController = require('../../image/image.controller')
const productController = require('../../product/product.controller');

router
  .route('/')
  .post(productController.createProduct)
  .get(productController.getProducts);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);


router
  .route('/images')
  .post(upload.single('image'), imageController.createImage);

router
  .route('/images/:filename')
  .get(imageController.getImages);

module.exports = router;