const notes = [ 
    { id: 'n101',
        createdAt: 1112222, 
        type: 'NoteTxt', 
        isPinned: true, 
        style: { backgroundColor: '#00d' }, 
        info: { txt: 'Fullstack Me Baby!' } 
    }, 
        
    { id: 'n102',
        createdAt: 1112223, 
        type: 'NoteImg', 
        isPinned: false, 
        info: { url: 'http://some-img/me', 
        title: 'Bobi and Me' }, 
        style: { backgroundColor: '#00d' } 
    },
     
    { id: 'n103', 
        createdAt: 1112224, 
        type: 'NoteTodos', 
        isPinned: false, 
        info: { title: 'Get my stuff together', 
        todos: [ { txt: 'Driving license', doneAt: null }, 
                 { txt: 'Coding power', 
                 doneAt: 187111111 } ] } 
    } 
]


import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { gNotes } from '../data/gnotes.js'

const NOTE_KEY = 'noteDB'

_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    getCategories,
    getAuthors,
    getEmptyReview,
   
}

function query(filterBy = {}) {
    // console.log(filterBy);

    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note =>
                    regExp.test(note.title)
                    || regExp.test(note.description)
                    || note.authors.includes(filterBy.txt)
                    || regExp.test(note.subtitle)
                    || note.categories.includes(filterBy.txt)
                )
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(_setNextPrevNoteId)
}

function remove(noteId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getDefaultFilter() {
    return { txt: ''}
}


function _createNote(info) {
    const note = getEmptyNote(info)
    note.id = makeId()
    return note
}


function getCategories() {
    return query().then(notes =>
        [...new Set(notes.flatMap(note => note.categories))]

    )
}
function getAuthors() {
    return query().then(notes =>
        [...new Set(notes.flatMap(note => note.authors))]

    )
}


function _createNotes() {

    let notes = loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {

        notes = []
        for (let i = 0; i < 20; i++) {
            const note = {
                id: 'n101',
                createdAt: 1112222, 
                type: 'NoteTxt', 
                isPinned: true, 
                style: { backgroundColor: '#00d' }, 
                info: { txt: 'Fullstack Me Baby!' }    
            }
            notes.push(note)
        }
        saveToStorage(NOTE_KEY, notes)
}
    console.log('notes', notes)
}


function _setNextPrevNoteId(note) {
    return query().then((notes) => {
        const noteIdx = notes.findIndex((currNote) => currNote.id === note.id)
        const nextNote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0]
        const prevNote = notes[noteIdx - 1] ? notes[noteIdx - 1] : notes[notes.length - 1]
        note.nextNoteId = nextNote.id
        note.prevNoteId = prevNote.id
        return note
    })
}

function getEmptyNote() {
    return {
        id: 'n101',
        createdAt: 1112222, 
        type: 'NoteTxt', 
        isPinned: true, 
        style: { backgroundColor: '#00d' }, 
        info: { 
            title:'important',
            txt: 'Fullstack Me Baby!' } 
    
    }
}


function getEmptyReview() {
    return {
        fullname: '',
        rating: '',
        readAt: ''
    }
}


