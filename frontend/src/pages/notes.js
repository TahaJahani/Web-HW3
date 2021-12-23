import { CircularProgress,Backdrop,Box, Grid } from '@mui/material';
import * as React from 'react';
import { useRecoilState } from 'recoil'
import { notesState } from '../state/notesAtom'
import { tokenState } from '../state/tokenAtom'
import NoteList from '../components/NoteList';
import Note from '../components/Note';
import CreateNote from '../components/CreateNode';
import loadNoteList from '../axiosCall/loadNoteList';
import loadNote from '../axiosCall/loadNote';


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

    const onNoteDeleted = (note) => {

    }

    const onNoteEdited = (note) => {

    }

    if (!dataLoaded) {
        loadNoteList(token, onNotesLoaded)
    }

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item sx={5}>
                    <NoteList notes={notes} onNoteSelected={onNoteSelected} />
                </Grid>
                <Grid item sx={7}>
                    {selectedNote ? <Note {...selectedNote} onClose={onNoteClosed} onEdit={onNoteEdited} onDelete={onNoteDeleted} /> : <CreateNote />}
                </Grid>
            </Grid>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={!dataLoaded}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    )
}

export default NotesPage;