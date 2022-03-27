const router = require('express').Router();
const Category = require('../models/category');

const checkJWT = require('../middlewares/check-jwt');
const Product = require('../models/product');
const async = require('async');

router.route('/category')
    .get((req, res, next) => {
            Category.find({}, (err, categories) => {
              res.json({
                success: true,
                message: "Success",
                categories: categories
              })
            })
        }
    )
    .post((req, res, next) => {
            Category.findOne({ name: req.body.category }, (err, category) => {
              if (category) {
                res.json("already exist")
              } else {
                  
                let category = new Category();
        
                category.name = req.body.category;
                category.save();
                res.json({
                  success: true,
                  message: "Successful"
                });
              }
            });
        }
    )

router.route('/products')
    .get(checkJWT, (req, res, next) => {
        Product.find({})
            .populate('category')
            .exec((err, products) => {
                if(products) {
                    res.json({
                        success: true,
                        message: 'Products',
                        'products': products
                    });
                }
            })
    })
    .post(checkJWT, (req,res,next) => {
        let product = new Product();
        product.id = req.body.productId;
        product.category = req.body.categoryId;
        product.name = req.body.productname;
        product.description = req.body.description;
        product.unit = req.body.unit;
        product.save();
        res.json({
            success: true,
            message: 'Successfully Added'
        })
    })

router.route('/product/:id')
  .get((req, res, next) => {
  Product.findOne({ id: req.params.id })
    .populate('category')
    .exec((err, product) => {
      if(err) {
        res.json({
          success: false,
          message: 'Product is not found'
        });
      } else {
        if(product) {
          res.json({
            success: true,
            product: product
          });
        }
      }
    })
  })
  .post(checkJWT, (req, res, next) => {
    Product.findOne({ id: req.params.id }, (err, product) => {
      if(err) return next(err)
      if(req.body.id) product.id = req.body.productId;
      if(req.body.category) product.category = req.body.categoryId;
      if(req.body.name) product.name = req.body.productname;
      if(req.body.description) product.description = req.body.description;
      if(req.body.unit) product.unit = req.body.unit;
      product.save();
      res.json({
        success: true,
        message: 'Successfully Edited'
      })

    })
  })
  .delete(checkJWT, (req, res, next) => {
    Product.findOne({ id: req.params.id }, (err, product) => {
      product.delete();
      res.json({
        success: true,
        message: 'Successfully Deleted'
      })
    })
  })

router.post('/categorysearch',checkJWT, (req, res, next) => {

      Product.find({$and:[{category: req.body.catid},{name:req.body.searchTxt}]})
        .populate('category')
        .exec((err, products) => {
          if(products) {
            res.json({
              success: true,
              message: 'Category Based Search Result',
              products: products
            })
          }
        });
    
});

module.exports = router;