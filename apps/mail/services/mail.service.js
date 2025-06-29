import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject))
            }
            return mails
        })
}

function get(bookId) {
    return storageService.get(MAIL_KEY, bookId)
        .then(_setNextPrevCarId)
}

function remove(bookId) {
    return storageService.remove(MAIL_KEY, bookId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(subject = '') {
    return { subject }
}

function getDefaultFilter() {
    return { txt: '' }
}

function _createMails() {
    let mails = loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            _createMail('audu'),
            _createMail('fiak'),
            _createMail('subali'),
            _createMail('mitsu')
        ]
        saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject) {
    const mail = getEmptyMail(subject)
    mail.id = makeId()
    return mail
}


function _setNextPrevCarId(mail) {
    return query().then((mails) => {
        const carIdx = mails.findIndex((currCar) => currCar.id === mail.id)
        const nextCar = mails[carIdx + 1] ? mails[carIdx + 1] : mails[0]
        const prevCar = mails[carIdx - 1] ? mails[carIdx - 1] : mails[mails.length - 1]
        mail.nextCarId = nextCar.id
        mail.prevCarId = prevCar.id
        return mail
    })
}

