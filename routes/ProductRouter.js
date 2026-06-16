const express = require('express')
const router = express.Router()
const product = require('../controllers/ProductController')
const Auth = require('../middleware/JwtService')

router.get("/", Auth, product.GetProducts)
      .get("/barcode/:barcode",Auth,product.GenerateBarcode)
      .get("/scan/:barcode",Auth,product.GetProductByBarcode)
      .get("/:id",Auth,product.GetProduct)
      .post("/",Auth,product.CreateProduct)
      .put("/:id",Auth,product.UpdateProduct)
      .delete("/:id",Auth,product.DeleteProduct);
      
module.exports = router