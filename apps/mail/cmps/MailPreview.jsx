export function MailPreview({ mail }) {

    const readClass = mail.isRead ? 'read' : 'unread'

    function onMailClicked() {
        console.log(mail)
        return mail.isRead = false
    }

    return (
        <div className={`mail ${readClass}`}>
            <div className="mail-status">
                {!mail.isRead && <span className="unread-dot">●</span>}
            </div>
            <span className="mail-from" onClick={onMailClicked}>
                {mail.from}
            </span>

            <span className="mail-subject">{mail.subject}</span>
        </div>
    )
} 