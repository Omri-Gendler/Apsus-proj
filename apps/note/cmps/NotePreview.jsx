

export function NotePreview({note}){
    console.log(note)

    return (
       
        <div className="note">
         <button className="btn-delete" onClick={() => onRemoveNote(note.id)}>
            X
         </button>
        <h1>{note.info.title}</h1>
        <p>{note.info.txt}</p>
        </div>

       
    )

}