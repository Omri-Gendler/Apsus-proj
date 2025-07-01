import { MailList } from "../cmps/MailList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
const { Link } = ReactRouterDOM
const { useState, useEffect } = React
export function NoteIndex({ logo }) {
    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter(''))
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
    function onRemoveMails(noteId) {
        noteService.remove(noteId)
            .then(() => {
                showSuccessMsg('Mail Removed Successfully!')
                setNotes((prevMails) =>
                    prevMails.filter(mail => mail.id !== noteId)
                )
            })
            .catch(err => {
                console.log(err)
                showErrorMsg('Problem removing Mail')
            })
    }
    // function onSetFilterBy(filterByToEdit) {
    //     setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    // }
    if (!notes) return <div className="container">Loading...</div>
    return console.log(notes)
}