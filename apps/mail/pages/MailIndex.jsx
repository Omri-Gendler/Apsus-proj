import { mailService } from "../services/mail.service.js"
const { useState, useEffect } = React

export function MailIndex() {
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

