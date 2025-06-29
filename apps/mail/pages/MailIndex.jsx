import { mailService } from "../services/mail.service.js"
const { useState, useEffect } = React

export function MailIndex() {

    const [mails, setMails] = useState(null)
    // const [filterBy, setFilterBy] = useState(carService.getDefaultFilter())

    useEffect(() => {
        loadMails()

    }, [])

    function loadMails() {
        mailService.query()
            .then(setMails)
            .catch(err => {
                console.log('err:', err)
            })
    }
    console.log(mails)

    if (!mails) {
        return <div>loading...</div>
    }
    return (
        <div className="mail-index">
            <h1>Welcome to your Mail App</h1>
            <ul className="mail-list">
                {mails.map(mail => (
                    <li key={mail.id} className="mail-preview">
                        {/* <span className="mail-from">{mail.from}</span> */}
                        <span className="mail-subject">{mail.subject}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}