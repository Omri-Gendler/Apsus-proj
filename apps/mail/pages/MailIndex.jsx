import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
const { useState, useEffect } = React

export function MailIndex({ logo }) {
    const [mails, setMails] = useState(null)

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
            <MailList mails={mails} logo={logo} />
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
            </ul>
        </div>
    )
}

