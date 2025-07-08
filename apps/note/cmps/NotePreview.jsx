const { useState, useEffect } = React

import { Modal } from "/Modal.jsx"


export function NotePreview({note, onRemoveNote}){
    console.log(note)
   const [showModal, setShowModal] = useState(false)


    return (
       
        <div className="note ">
        <h1>{note.info.title}</h1>
        <p>{note.info.txt}</p>
         <button className="delete-button" onClick={() => onRemoveNote(note.id)}>
            delete
         </button>
         <button onClick={() => setShowModal(true)}>Open Modal</button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h3>choose background color</h3>
        <input type="color" />
      </Modal>
              
            
        </div>
       
    )

}