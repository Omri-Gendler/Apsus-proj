export function MailList({ mails }) {

    if (!mails || mails.length === 0) {
        return <div className="no-emails">No emails to show</div>
    }
    return (
        <div>
            <ul className="mail-list">
                {mails.map(mail => (
                    <li className="mail-preview" key={mail.id}>
                        <span className="from">{mail.from}</span>
                        <span className="subject">{mail.subject}</span>
                    </li>

                ))}
                {console.log(mails)}
            </ul>
        </div>
    )
}
