module.exports = {
    createNote: (req, res, next) => {
        res.json({
            "status": "ok",
            "message": "Note Created!"
        })
    }
}