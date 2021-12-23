import { CircularProgress, Backdrop, Box, Grid, Container } from '@mui/material';
import * as React from 'react';
import { useRecoilState } from 'recoil'
import { notesState } from '../state/notesAtom'
import { tokenState } from '../state/tokenAtom'
import NoteList from '../components/NoteList';
import Note from '../components/Note';
import CreateNote from '../components/CreateNode';
import loadNoteList from '../axiosCall/loadNoteList';
import loadNote from '../axiosCall/loadNote';
import deleteNote from '../axiosCall/deleteNote';
import createNote from '../axiosCall/createNote';


function NotesPage() {
    const [dataLoaded, setDataLoaded] = React.useState(false)
    const [notes, setNotes] = useRecoilState(notesState)
    const [token, setToken] = useRecoilState(tokenState)
    const [selectedNote, setSelectedNote] = React.useState()

    const onNoteSelected = (note) => {
        loadNote(note.id, token, (note) => setSelectedNote(note))
    }

    const onNotesLoaded = (notesList) => {
        setDataLoaded(true)
        setNotes(notesList)
    }

    const onNoteClosed = () => {
        setSelectedNote(null)
    }

    const onNoteDeleted = (noteId) => {
        deleteNote(noteId, token, () => {
            setNotes(notes.filter((item) => (item.id != noteId)))
            setSelectedNote(null)
        })
    }

    const onNoteEdited = (note) => {

    }

    const onNoteSubmitted = (note) => {
        createNote(note, token, (submitedNote) => setNotes([...notes, submitedNote]))
    }

    if (!dataLoaded) {
        loadNoteList(token, onNotesLoaded)
    }

    return (
        <Container>
            <Box>
                <Grid container spacing={2}>
                    <Grid item sx={5}>
                        <NoteList notes={notes} onNoteSelected={onNoteSelected} />
                    </Grid>
                    <Grid item sx={7}>
                        {selectedNote ? <Note {...selectedNote} onClose={onNoteClosed} onEdit={onNoteEdited} onDelete={onNoteDeleted} /> : <CreateNote onSubmit={onNoteSubmitted}/>}
                    </Grid>
                </Grid>
            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={!dataLoaded}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    )
}

export default NotesPage;