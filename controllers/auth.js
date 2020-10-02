exports.signup = (req, res) => {
    console.log(req.body);
    res.json({
        msg: "user signup"
    })
}

exports.signout = (req, res) => {
    res.json({
        msg: "user signout"
    })
}