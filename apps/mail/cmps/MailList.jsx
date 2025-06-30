export function MailList({ mail }) {

    if (!mail || mail.length === 0) {
        return <div className="no-emails">No emails to show</div>
    }
    return (
        <div>
            <ul className="mail-list">
                {mail.map(mail => (
                    <MailPreview key={mail.id} mail={mail} />
                ))}
            </ul>
        </div>
    )
}
