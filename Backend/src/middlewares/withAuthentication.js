const { User } = require('../database/sequelize')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    let apiKey = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!apiKey) {
        res.status(403).json({
            status: "error",
            message: "access denied"
        })
        return
    }

    jwt.verify(apiKey, process.env.SECRET_KEY, async (err, user) => {
        if (err) {
            console.log(err);
            res.status(403).json({
                status: "error",
                message: "access denied"
            })
            return
        }
        req.user = await User.findOne({
            where: {
                id: user.id,
            }
        })

        next()
    })
}