

export function NotePreview({note}){
    console.log(note)

    return (
       
        <div className="note">
        <h1>{note.info.title}</h1>
        <p>{note.info.txt}</p>
        </div>
       
    )

}