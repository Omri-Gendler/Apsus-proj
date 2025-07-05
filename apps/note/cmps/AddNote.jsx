
const { useState, useRef } = React
import { makeId } from "../services/util.service.js"


export function AddNote({onAddNote}){
    const [isExpanded, setIsExpanded] = useState(false)
    const [title, setNoteTitle] = useState('')
    const [txt, setNoteTxt] = useState('')
    const containerRef = useRef(null)

    function expandNote() {
        setIsExpanded(true)
    }


   function onSubmit(ev){
   ev.stopPropagation()
    if (title || txt){
       const newNote = {
            id: makeId(), 
            createdAt: Date.now(),
            type: 'NoteTxt',
            isPinned: false, 
            style: {
                backgroundColor: '#fff' 
            },
            info: {
                title, 
                txt    
            }
}

        onAddNote(newNote)
    }
    setIsExpanded(false)
    setNoteTitle('')
    setNoteTxt('')

   }

   return(

         <div
      ref={containerRef}
      className="add-note-container"
      onClick={expandNote}
    >
        {!isExpanded && (
        <input
          type="text"
          placeholder="Take a note..."
          className="note-input collapsed"
          readOnly
        />
      )}
            {isExpanded && (<div className="note-expanded note">
          <input
            type="text"
            placeholder="Title"
            className="note-title"
            value={title}
            onChange={(ev) => setNoteTitle(ev.target.value)}
          />
          <textarea
            placeholder="Take a note..."
            className="note-body"
            value={txt}
            onChange={(ev) => setNoteTxt(ev.target.value)}
          />
          <div className="note-actions">
            <button className="btn" onClick={onSubmit}>Close</button>
          </div>
        </div>
            )}
        </div>
   )

    
}