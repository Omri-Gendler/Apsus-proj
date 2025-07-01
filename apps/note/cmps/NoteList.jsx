import { NotePreview } from "./NotePreview.jsx"

export function NoteList(notes) {

    if(!notes || notes.length === 0){
        return <div className="no-notes">make a note</div>
    }
    return (<div>
                <ul className="note-list">
                    {notes.map(note =>(
                        <NotePreview
                            key={note.id}
                            note={note}
                        />
                    ))}
                    console.log(notes)
                </ul>
            </div>)
}

