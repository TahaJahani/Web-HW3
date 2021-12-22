const { User, Note } = require('../database/sequelize')

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
        let updateSet = {}
        if (req.body.title)
            updateSet.title = req.body.title
        if (req.body.body)
            updateSet.body = req.body.body
        if (req.body.color)
            updateSet.color = req.body.color
        let numChanged = await Note.update(updateSet, {
            where: {
                id: req.params.id, userId: req.user.id
            }
        })
        if (numChanged != 0) {
            res.json({
                status: "ok",
            })
        } else {
            res.status(404).json({
                status: "error",
                message: "Note not found"
            })
        }
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