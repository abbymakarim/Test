const router = require('express').Router()
const productController = require('../controllers/productController')

router.get('/', productController.getProducts)
router.post('/', productController.addProducts)
router.get('/:id', productController.getOneProduct)
router.put('/:id', productController.editProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router