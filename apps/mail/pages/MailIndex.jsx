import { MailList } from "../cmps/MailList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { Link } = ReactRouterDOM
const { useState, useEffect } = React

export function MailIndex({ logo }) {

    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter(''))

    useEffect(() => {
        loadMails()

    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(setMails)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onRemoveMails(mailId) {
        mailService.remove(mailId)
            .then(() => {
                showSuccessMsg('Mail Removed Successfully!')
                setMails((prevMails) =>
                    prevMails.filter(mail => mail.id !== mailId)
                )
            })
            .catch(err => {
                console.log(err)
                showErrorMsg('Problem removing Mail')
            })
    }

    function onSetFilterBy(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }

    if (!mails) return <div className="container">Loading...</div>
    return (
        <div className="mail-inbox">

            <aside className="side-bar">

                {logo && (
                    <div className="mail-logo-container">
                        <img src={logo} alt="Section Logo" />
                    </div>
                )}
                <div className="side-bar">
                    <div>Inbox</div>
                    <div>Starred</div>
                    <div>Snoozed</div>
                    <div>Sent</div>
                    <div>Drafts</div>
                </div>
            </aside>
            <main className="mail-main-content">
                {<MailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />}
                {<MailList mails={mails} logo={logo} />}
            </main>
        </div>
    )
}
