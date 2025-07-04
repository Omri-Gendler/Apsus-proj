import { NoteList } from "../cmps/NoteList.jsx"

import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { Link } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteIndex({ logo }) {
    const [notes, setNotes] = useState(null)
   
    useEffect(() => {
        loadNotes()
    }, [])
    function loadNotes() {
        noteService.query()
            .then(setNotes)
            .catch(err => {
                console.log('err:', err)
            })
    }
    // function onRemoveNote(noteId) {
    //     noteService.remove(noteId)
    //         .then(() => {
    //             showSuccessMsg('Note Removed Successfully!')
    //             setNotes((prevNotes) =>
    //                 prevMails.filter(note => note.id !== noteId)
    //             )
    //         })
    //         .catch(err => {
    //             console.log(err)
    //             showErrorMsg('Problem removing Note')
    //         })
    // }

    if (!notes) return <div className="container">Loading...</div>
    return <NoteList notes = {notes}/>

}