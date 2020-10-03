const Product = require('../models/product');

//Middleware
exports.getProductById = (req, res, next, id) => {
    Category.findById(id)
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