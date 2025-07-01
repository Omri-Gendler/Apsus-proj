

export function NotePreview({note}){

    return (
       
        <div class="note">
        <input type="text" name="title" placeholder="Title">{note.info.title}</input>
        <input type="text" name="content" placeHolder="Write anything...">{note.info.txt}</input>
        </div>
       
    )

}