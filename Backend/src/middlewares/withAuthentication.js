const {User, Token} = require('../database/sequelize')
module.exports = async (req, res, next) => {
    let apiKey = req.headers.authorization;
    if (!apiKey) {
        res.status(403).json({
            status: "error",
            message: "access denied"
        })
        return
    }
    let token = await Token.findOne({
        where: {
            token: apiKey,
        },
        include: [{
            model: User
        }]
    })
    req.user = token.user;
    next();
}