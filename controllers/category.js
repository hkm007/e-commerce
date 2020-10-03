const Category = require('../models/category');

//Middleware
exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) => {
        if(err) {
            return res.status(400).json({
                error: "Category not found!"
            })
        }

        req.category = cate;
        next();
    })
}

//Handler
exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if(err) {
            return res.status(400).json({
                error: "Category not saved!"
            })
        }
        res.json({category});
    })
}

//Handler
exports.getCategory = (req, res) => {
    return res.json(req.category);
}

//Handler
exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if(err) {
            return res.status(400).json({
                error: "No categories found!"
            })
        }
        res.json(categories);
    })
}

//Handler
exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, updatedCategory) => {
        if(err) {
            return res.status(400).json({
                error: "failed to update"
            })
        }
        res.json(updatedCategory);
    })
}

//Handler
exports.deleteCategory = (req, res) => {
    const category = req.category;
    category.remove((err, category) => {
        if(err) {
            return res.status(400).json({
                error: "failed to delete"
            })
        }
        res.json({
            message: "Successfully deleted!"
        });
    })
}