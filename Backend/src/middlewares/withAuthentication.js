const { User, Token } = require('../database/sequelize')
const jwt = require('jsonwebtoken')
require('dotenv').config()
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
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = await User.findOne({
            where: {
                id: user.id,
            }
        })

        next()
    })
}