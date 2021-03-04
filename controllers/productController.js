const { Product } = require('../models')

class productController {
  static getProducts(req, res){
    Product.findAll()
    .then(products => {
      res.status(200).json(products)
    })
    .catch(err => {
      res.status(500).json({message: "Internal Server Error"})
    })
  }

  static getOneProduct(req, res){
    const { id } = req.params
    Product.findOne({
      where: {
        id
      }
    })
    .then(product => {
      if(product === null){
        res.status(404).json('Not Found')
      } else {
        res.status(200).json(product)
      }
    })
    .catch(err => {
      res.status(500).json({message: "Internal Server Error"})
    })
  }

  static addProducts(req, res){
    const newProduct = {
      kategori: req.body.kategori,
      product: req.body.product,
      price: req.body.price
    }
    Product.create(newProduct)
    .then(product => {
      res.status(201).json(product)
    })
    .catch(err => {
      res.status(500).json({message: "Internal Server Error"})
    })
  }

  static editProduct(req, res){
    const productId = req.params.id
    const editProduct = {
      kategori: req.body.kategori,
      product: req.body.product,
      price: req.body.price
    }
    Product.update(editProduct, {
      where: {
        id: productId
      },
      returning: true
    })
    .then(product => {
      if(product[0] === 1){
        return Product.find()
      }
    })
    .then(edittedProduct => {
      res.status(200).json(edittedProduct)
    })
    .catch(err => {
      res.status(500).json({message: "Internal Server Error"})
    })
  }

  static deleteProduct(req, res){
    const productId = req.params.id
    Product.destroy({
      where: {
        id: productId
      }
    })
    .then(result => {
      if(result === 1){
        res.status(200).json({message: "Product have ben deleted"})
      } else {
        res.status(200).json({message: "No product found"})
      }
    })
    .catch(err => {
      res.status(500).json({message: "Internal Server Error"})
    })
  }
}

module.exports = productController