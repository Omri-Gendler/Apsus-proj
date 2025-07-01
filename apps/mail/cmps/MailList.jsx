import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails }) {

    if (!mails || mails.length === 0) {
        return <div className="no-emails">No emails to show</div>
    }
    return (
        <div>
            <ul className="mail-list">
                {mails.map(mail => (
                    < MailPreview
                        key={mail.id}
                        mail={mail}
                    />
                ))}
                {console.log(mails)}
            </ul>
        </div>
    )
}
