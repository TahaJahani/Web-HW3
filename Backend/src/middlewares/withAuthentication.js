module.exports = (req, res, next) => {
    let apiKey = req.headers.authorization;
    if (!apiKey)
        res.status(403).json({
            status: "error",
            message: "access denied"
        })
    else {
        // TODO
        next();
    }
}