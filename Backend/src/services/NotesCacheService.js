const { get, set, clear } = require("../services/CacheService")

module.exports = {
    getSingleNote(noteId, userId, completion) {
        let key = noteId + "-Note-" + userId + "-User";
        let note = null;
        get(key, function (content) {
            if (content != -1){
                completion(JSON.parse(content));
            }
        })
    },

    getAllNotes(userId) {

    },

    saveSingleNote(note, userId) {
        let key = note.id + "-Note-" + userId + "-User";
        set(key, JSON.stringify(note));
    },

    saveAllNotes(user, notes) {

    },

    deleteNote(noteId) {

    },

    deleteAllNotes(user) {

    },
}