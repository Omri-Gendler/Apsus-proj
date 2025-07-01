import { loadFromStorage, makeId, saveToStorage } from '../services/util.service.js'
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

        const notes = [{

            id: 'e101',
            createdAt: 1672531200000, // Jan 1, 2023
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: 1672531205000,
            removedAt: null,
            from: 'momo@momo.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e102',
            createdAt: 1675209600000, // Feb 1, 2023
            subject: 'Project Update',
            body: 'The project is on track for next week.',
            isRead: true,
            sentAt: 1675209605000,
            removedAt: null,
            from: 'sara@work.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e103',
            createdAt: 1677628800000, // Mar 1, 2023
            subject: 'Invitation',
            body: 'You are invited to my birthday party!',
            isRead: false,
            sentAt: 1677628805000,
            removedAt: null,
            from: 'david@friends.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e104',
            createdAt: 1680307200000, // Apr 1, 2023
            subject: 'Sale Alert!',
            body: 'Don’t miss our exclusive sale this weekend.',
            isRead: false,
            sentAt: 1680307205000,
            removedAt: null,
            from: 'store@shop.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e105',
            createdAt: 1682899200000, // May 1, 2023
            subject: 'Meeting Reminder',
            body: 'Reminder: Team meeting at 10am tomorrow.',
            isRead: true,
            sentAt: 1682899205000,
            removedAt: null,
            from: 'boss@company.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e106',
            createdAt: 1685577600000, // Jun 1, 2023
            subject: 'Newsletter',
            body: 'Check out our latest news and updates.',
            isRead: false,
            sentAt: 1685577605000,
            removedAt: null,
            from: 'newsletter@news.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e107',
            createdAt: 1688169600000, // Jul 1, 2023
            subject: 'Flight Confirmation',
            body: 'Your flight has been booked successfully.',
            isRead: true,
            sentAt: 1688169605000,
            removedAt: null,
            from: 'airline@flights.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e108',
            createdAt: 1690848000000, // Aug 1, 2023
            subject: 'Password Reset',
            body: 'Click here to reset your password.',
            isRead: false,
            sentAt: 1690848005000,
            removedAt: null,
            from: 'support@service.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e109',
            createdAt: 1693526400000, // Sep 1, 2023
            subject: 'Job Application',
            body: 'Thank you for applying. We will get back to you soon.',
            isRead: false,
            sentAt: 1693526405000,
            removedAt: null,
            from: 'hr@company.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e110',
            createdAt: 1696118400000, // Oct 1, 2023
            subject: 'Welcome!',
            body: 'Welcome to our service. Let us know if you need help.',
            isRead: true,
            sentAt: 1696118405000,
            removedAt: null,
            from: 'welcome@service.com',
            to: 'user@appsus.com'
        }
        ]
        saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(subject) {
    const note = getEmptyNote(subject)
    note.id = makeId()
    return note
}