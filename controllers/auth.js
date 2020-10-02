const User = require('../models/user');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                err: "Not able to save user in DB"
            })
        }
        
        res.json({
            username: user.username,
            email: user.email,
            id: user._id
        });
    });
}

exports.signin = (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;

    if(!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    User.findOne({email}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "User with this email doesn't exists"
            })
        }

        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email or password is incorrect"
            })
        }

        const token = jwt.sign({_id: user._id}, process.env.SECRET);

        res.cookie("token", token, { expire: new Date() + 9999 });
        const { _id, username, email, role } = user;
        return res.json({token, user: { _id, username, email, role }});
    })
}

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        msg: "User signout successfully"
    })
}

// protected
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
})

// custom middleware