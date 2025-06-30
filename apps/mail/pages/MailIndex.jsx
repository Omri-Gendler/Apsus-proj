import { mailService } from "../services/mail.service.js"
import { utilService } from "../services/util.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
const { useState, useEffect } = React

export function MailIndex({ logo }) {
    const [mails, setMails] = useState(null)
    const [filterBy, onSetFilterBy] = useState('')

    useEffect(() => {
        mailService.query()
            .then(resolvedMails => {
                setMails(resolvedMails)
            })
            .catch(err => {
                console.error("Failed to load mails:", err)
            })
    }, [])

    if (!mails) {
        return <div>Loading mails...</div>
    }

    return (
        <div className="mail-inbox">


            {logo && (
                <div className="mail-logo-container">
                    <img src={logo} alt="Section Logo" />
                </div>
            )}
            <div>
                <div className="side-bar">Inbox</div>
                <div className="side-bar">Starred</div>
                <div className="side-bar">Snoozed</div>
                <div className="side-bar">Sent</div>
                <div className="side-bar">Drafts</div>
            </div>

            <ul className="mail-list">
            <input type="text" name="text" id="text" placeHolder="Search" />
                {mails.map(mail => (
                    <li className="mail-preview" key={mail.id}>
                        <span className="from">{mail.from}</span>
                        <span className="subject">{mail.subject}</span>
                    </li>

                ))}
                {console.log(mails)}
                {/* <MailList mails={mails} logo={logo} />
                <MailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} /> */}
            </ul>
        </div>
    )
}
