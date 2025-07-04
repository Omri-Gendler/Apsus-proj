import { loadFromStorage, makeId, makeLorem, saveToStorage } from '../services/util.service.js'
import { storageService } from './async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()



const loggedinUser = {
    enote: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.subject))
            }
            return notes
        })
}

function get(bookId) {
    return storageService.get(NOTE_KEY, bookId)
        .then(_setNextPrevCarId)
}

function remove(bookId) {
    return storageService.remove(NOTE_KEY, bookId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(subject = '') {
    return { subject }
}

function getDefaultFilter() {
    return { txt: '' }
}

function _createNotes() {
   let notes = loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {

    const notes = [ { id: 'n101', createdAt: 1112222, type: 'NoteTxt', isPinned: true, style: { backgroundColor: '#00d' }, info: { title:'hellow',txt: 'hi kdfiknfeifnefn ejnfeinfienf ejknfebnfeinbf jenfiewfieqfipeq ejfneif njebnfie ienwflibnfeibf. ejkfbewjkbfjeb hkeb wfkjekwhbf kbnefiewbf ewfjnewfbn' } }, { id: 'n102', createdAt: 1112223, type: 'NoteImg', isPinned: false, info: { url: 'http://some-img/me', title: 'Bobi and Me' }, style: { backgroundColor: '#00d' } }, { id: 'n103', createdAt: 1112224, type: 'NoteTodos', isPinned: false, info: { title: 'Get my stuff together', todos: [ { txt: 'Driving license', doneAt: null }, { txt: 'Coding power', doneAt: 187111111 } ] } }]
        saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(subject) {
    const note = getEmptyNote(subject)
    note.id = makeId()
    return note
}