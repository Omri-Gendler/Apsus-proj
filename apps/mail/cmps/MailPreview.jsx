import { LongTxt } from "./LongTxt.jsx"

export function MailPreview({ mail, onRemoveMail }) {

    const readClass = mail.isRead ? 'read' : 'unread'

    function onMailClicked() {
        console.log(mail)
        return mail.isRead = false
    }

    return (
        <div className={`mail ${readClass}`}>
            {/* <LongTxt txt={mail.subject} /> */}
            <div className="mail-status">
                {!mail.isRead && <span className="unread-dot">●</span>}
            </div>

            <p className="mail-from" onClick={onMailClicked}>
                {mail.from}
            </p>

            <p className="mail-subject">
                {mail.subject}
            </p>

            <p className="mail-created">
                {mail.createdAt}
            </p>
            <div>
                <button className="delete-btn" onClick={() => onRemoveMail(mail.id)}>Delete</button>
            </div>
        </div>
    )
} 