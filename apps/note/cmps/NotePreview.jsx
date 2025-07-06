

export function NotePreview({note, onRemoveNote}){
    console.log(note)

    return (
       
        <div className="note ">
        <h1>{note.info.title}</h1>
        <p>{note.info.txt}</p>
         <button className="delete-button" onClick={() => onRemoveNote(note.id)}>
            delete
         </button>
         <button className="color-button button">bg-color</button>
        </div>
       
    )

}