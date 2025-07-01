
export function MailPreview({ mail }) {

    const readClass = mail.isRead ? 'read' : 'unread'

    return (
        <div className={`mail ${readClass}`}>

            <span className="mail">{!mail.isRead && <span style={{ color: '#0b57d0', marginLeft: '8px', fontSize: '10px' }}>●</span>}
                {mail.from} </span>
            <span className="mail">{mail.subject}</span>
        </div >
    )
}
