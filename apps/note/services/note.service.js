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
const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
const authorsList = [
    'George Orwell', 'Jane Austen', 'Mark Twain', 'J.K. Rowling',
    'Ernest Hemingway', 'Virginia Woolf', 'F. Scott Fitzgerald',
    'Haruki Murakami', 'Stephen King', 'Toni Morrison',
    'Agatha Christie', 'Leo Tolstoy', 'Gabriel Garcia Marquez',
    'Isaac Asimov', 'Chinua Achebe', 'Margaret Atwood'
]
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
    mapGoogleNoteToAppNote,
    getNotesFromGoogle,
    getNotesFromGoogleMod
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
            if (filterBy.minPrice) {
                notes = notes.filter(note => note.listPrice.amount >= filterBy.minPrice)
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
    return { txt: '', minPrice: '' }
}


function _createNote(vendor, speed = 250) {
    const note = getEmptyNote(vendor, speed)
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
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                subtitle: utilService.makeLorem(4),
                authors: [
                    authorsList[utilService.getRandomIntInclusive(0, authorsList.length - 1)]
                ],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(20),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `NotesImages/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: utilService.getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                }
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

        title: "",
        subtitle: utilService.makeLorem(4),
        authors: [
            authorsList[utilService.getRandomIntInclusive(0, authorsList.length - 1)]
        ],
        publishedDate: "",
        description: "",
        pageCount: utilService.getRandomIntInclusive(20, 600),
        categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
        thumbnail: `NotesImages/${1}.jpg`,
        language: "en",
        listPrice: {
            amount: utilService.getRandomIntInclusive(80, 500),
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
        }
    }
}


function getEmptyReview() {
    return {
        fullname: '',
        rating: '',
        readAt: ''
    }
}

function mapGoogleNoteToAppNote(googleNote) {


    const info = googleNote.volumeInfo
    return {
        id: googleNote.id || utilService.makeId(),
        title: info.title || 'Untitled',
        subtitle: info.subtitle || utilService.makeLorem(4),
        authors: info.authors,
        publishedDate: info.publishedDate || '',
        description: info.description || utilService.makeLorem(20),
        pageCount: info.pageCount || utilService.getRandomIntInclusive(20, 600),
        categories: info.categories,
        thumbnail: (info.imageLinks && info.imageLinks.thumbnail) ? info.imageLinks.thumbnail : `NotesImages/${utilService.getRandomIntInclusive(1, 20)}.jpg`,
        language: info.language || 'en',
        listPrice: {
            amount: utilService.getRandomIntInclusive(80, 500),
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
        }
    }
}


function getNotesFromGoogle(searchTerm) {

    return Promise.resolve(gNotes.items)

    return fetch(`https://www.googleapis.com/notes/v1/volumes?printType=notes&q=${searchTerm}`)
        .then(res => res.json()).then(res => res.items)

}

function getNotesFromGoogleMod() {

    const notes = gNotes.items.map(mapGoogleNoteToAppNote)

    return Promise.resolve(notes)
}