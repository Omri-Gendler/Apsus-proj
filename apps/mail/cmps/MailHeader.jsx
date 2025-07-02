import { MailFilter } from "./MailFilter.jsx";

export function MailHeader({ filterBy, onSetFilterBy }) {
    return (
        <div>
            <MailFilter filterBy={filterBy} />
        </div>
    )
}