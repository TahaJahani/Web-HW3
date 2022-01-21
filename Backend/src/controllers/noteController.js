const user = require('../database/models/user');
const { Note } = require('../database/sequelize')
const singleflight = require('node-singleflight')
const { saveSingleNote, getSingleNote, deleteNote } = require("../services/NotesCacheService");

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
        let note = await Note.create({
            title: title,
            body: body,
            color: color,
            userId: req.user.id
        })
        saveSingleNote(note, req.user.id)
        res.json({
            status: "ok",
            result: note
        })
    },

    getAllNotes: async (req, res, next) => {
<<<<<<< HEAD
        let _ = singleflight.Do('getAllNotes', async () => {
            let notes = await req.user.getNotes({
                attributes: ["id", "title", "color"]
            });
            res.json({
                status: "ok",
                notes: notes
            })
        });
=======
        let options = { attributes: ["id", "title", "color"] }
        console.log(req.user.id)
        if (!req.user.isAdmin)
            options = {
                ...options,
                where: {
                    userId: req.user.id
                }
            }
        let notes = await Note.findAll(options)
        res.json({
            status: "ok",
            notes: notes
        })
>>>>>>> 591bfa42bcd0e3df1616e22944ab6560b9d9ddec
    },

    editNote: async (req, res, next) => {
        let updateSet = {}
        if (req.body.title)
            updateSet.title = req.body.title
        if (req.body.body)
            updateSet.body = req.body.body
        if (req.body.color)
            updateSet.color = req.body.color
        let whereClause = {
            id: req.params.id
        }
        if (!req.user.isAdmin)
            whereClause = { ...whereClause, userId: req.user.id }
        let numChanged = await Note.update(updateSet, { where: whereClause })
        deleteNote(req.params.id, req.user.id)
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
<<<<<<< HEAD
        let _ = singleflight.Do('getNote', async () => { 
            getSingleNote(req.params.id, req.user.id, async (note) => {
                if (!note) {
                    let note = await req.user.getNotes({
                        where: {
                            id: req.params.id
                        }
                    });
                    note = note[0];
                    saveSingleNote(note, req.user.id)
                    res.json({
                        status: "ok",
                        result: {
                            note: note,
                        }
                    })
                    return;
                }
=======
        let whereClause = { id: req.params.id }
        if (!req.user.isAdmin)
            whereClause = { ...whereClause, userId: req.user.id }
        getSingleNote(req.params.id, req.user.id, async (note) => {
            if (!note) {
                let note = await Note.findOne({
                    where: whereClause
                })
                saveSingleNote(note, req.user.id)
>>>>>>> 591bfa42bcd0e3df1616e22944ab6560b9d9ddec
                res.json({
                    status: "ok",
                    result: {
                        note: note,
                    }
                })
            })
<<<<<<< HEAD
        });
        
        
=======
        })

>>>>>>> 591bfa42bcd0e3df1616e22944ab6560b9d9ddec
    },

    deleteNote: async (req, res, next) => {
        let whereClause = { id: req.params.id }
        if (!req.user.isAdmin)
            whereClause = { ...whereClause, userId: req.user.id }
        let numDeleted = await Note.destroy({
            where: whereClause
        })
        deleteNote(req.params.id, req.user.id)
        if (numDeleted != 0) {
            res.json({
                status: "ok",
            })
        } else {
            res.status(404).json({
                status: "error",
                message: "Note not found"
            })
        }
    }
}