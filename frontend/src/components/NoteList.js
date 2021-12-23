import { Divider, List, ListItem, ListItemButton, Typography } from '@mui/material';
import * as React from 'react';

function NoteList({ notes, onNoteSelected }) {
    return (
        <List>
            {notes.map((item, i) =>
            (<div key={i}>
                <ListItem>
                    <ListItemButton onClick={() => onNoteSelected(item)}>
                        <Typography variant="h6">
                            {(item.title)}
                        </Typography>
                    </ListItemButton>
                </ListItem>
                <Divider />
            </div>)
            )}
        </List>
    )
}

export default NoteList