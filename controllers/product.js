const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

//Middleware
exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if(err) {
            return res.status(400).json({
                error: "Product not found!"
            })
        }

        req.product = product;
        next();
    })
}

//Handler
exports.createProduct = (req, res) => {
    let form = formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err) {
            return res.status(400).json({
                error: "Problem with image"
            })
        }

        const { name, description, price, category, stock } = fields;

        if(
            !name ||
            !description ||
            !price || 
            !category ||
            !stock
        ) {
            return res.status(400).json({
                error: "Please include all fields"
            })
        }

        let product = new Product(fields);

        //handle file
        if(file.photo) {
            if(file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "file size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        //save to DB
        product.save((err, product) => {
            if(err) {
                return res.status(400).json({
                    error: "Saving tshirt in DB failed"
                })
            }
            res.json(product);
        })
    })
}

exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

//Middleware
exports.photo = (req, res, next) => {
    if(req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

//Handler
exports.updateProduct = (req, res) => {
    let form = formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err) {
            return res.status(400).json({
                error: "Problem with image"
            })
        }

        //updation
        let product = req.product;
        product = _.extend(product, fields);

        //handle file
        if(file.photo) {
            if(file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "file size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        //save to DB
        product.save((err, product) => {
            if(err) {
                return res.status(400).json({
                    error: "updation failed"
                })
            }
            res.json(product);
        })
    })
}

exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if(err) {
            return res.status(400).json({
                error: "failed to delete the product"
            })
        }
        res.json({
            message: "successfull deletion"
        })
    })
}

exports.getAllProduct = (re, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
        if(err) {
            return res.status(400).json({
                error: "No products found!"
            })
        }
        res.json(products);
    })
}

exports.getAllUniqueCategory = (req, res) => {
    Product.distinct("category", (err, category) => {
        if(err) {
            return res.status(400).json({
                error: "No categories found!"
            })
        }
        res.json(category);
    })
}

exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: {_id: prod._id},
                update: {$inc: {stock: -prod.count, sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if(err) {
            return res.status(400).json({
                error: "bulk operations failed"
            })
        }
        next();
    })
}
