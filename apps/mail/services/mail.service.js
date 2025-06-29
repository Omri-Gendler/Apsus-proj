import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const MAIL_KEY = 'mailDB'
// _createMails()


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

        const mails = [{

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

