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
        <div>
            {/* <div className="search-input">

                <input type="text" name="text" id="text" placeHolder="Search" />

                <button className="search">Search</button>

            </div> */}

            {logo && (
                <div className="mail-logo-container">
                    <img src={logo} alt="Section Logo" />
                </div>
            )}
            <h1>Inbox</h1>
            <ul className="mail-list">
                {mails.map(mail => (
                    <li className="mail-preview" key={mail.id}>
                        From: {mail.from} | Subject: {mail.subject}
                    </li>
                ))}
                {console.log(mails)}
                <MailList mails={mails} logo={logo} />
                <MailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
            </ul>
        </div>
    )
}
