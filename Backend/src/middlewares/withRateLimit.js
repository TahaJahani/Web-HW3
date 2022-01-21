const { set, get } = require("../services/CacheService")


function saveLimitData(ip, count) {
    let toSave = {
        count: count,
        time: new Date().getTime(),
    }
    set(ip, JSON.stringify(toSave))
}

module.exports = async (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    get(ip, (content) => {
        if (!content) {
            saveLimitData(ip, 1)
            next();
        } else {
            let { count, time } = JSON.parse(content);
            let minutes = (new Date().getTime() - Number(time)) / (1000 * 60)
            if (minutes < 1) {
                if (count > process.env.RATE_LIMIT)
                    return res.status(409).json({
                        status: "error",
                        message: "too many requests"
                    });
                else {
                    saveLimitData(ip, count + 1);
                    next();
                }
            } else {
                saveLimitData(ip, 1)
                next();
            }
        }
    })
}