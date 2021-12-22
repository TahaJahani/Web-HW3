const {User, Note} = require('../database/sequelize')

module.exports = {
    createNote: async (req, res, next) => {
        let title = req.body.title
        let body = req.body.body
        let color = req.body.color ?? "#ffffff"
        if (!title || !body || !color) {
            res.status(400).json({
                status: "error",
                message: "Title and Body are required"
            })
            return
        }
        let note = await req.user.createNote({
            title: title,
            body: body,
            color: color,
        })
        res.json({
            status: "ok",
            result: note
        })
    },

    getAllNotes: async (req, res, next) => {
        let notes = await req.user.getNotes();
        res.json({
            status: "ok",
            notes: notes
        })
    },

    editNote: async (req, res, next) => {

    },

    getNote: async (req, res, next) => {
        let note = await req.user.getNotes({
            where: {
                id: req.params.id
            }
        })
        res.json({
            status: "ok",
            result: {
                note: note[0],
            }
        })
    },

    deleteNote: async (req, res, next) => {

    }
}