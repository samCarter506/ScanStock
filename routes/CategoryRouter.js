const category = require('../controllers/CategoryController')
const Auth = require('../middleware/JwtService')
const express = require('express')
const router = express.Router()

router.get('/',Auth,category.GetCategories)
      .get('/:id',Auth,category.getCategory)
      .post('/',Auth,category.CreateCategory)
      .put('/:id',Auth,category.UpdateCategory)
      .delete('/:id',Auth,category.deleteCategory)

module.exports = router