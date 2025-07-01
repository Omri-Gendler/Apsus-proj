import { mailService } from "../services/car.service.js"
const { useParams, useNavigate, Link } = ReactRouterDOM

const { useState, useEffect } = React

export function MailDetails() {

    const [mail, setMail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [params.mail.id])

    function loadMail() {
        setIsLoading(true)
        mailService.get(params.mail.id)
            .then(mail => setMail(mail))
            .catch(err => console.log('err:', err))
            .finally(() => setIsLoading(false))
    }


    function onBack() {
        navigate('/mail')
    }

    if (isLoading) return <div className="loader">Loading...</div>

    return (
        <section className="mail-details container">
            <h1>mail: {mail}</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae fuga eveniet, quisquam ducimus modi optio in alias accusantium corrupti veritatis commodi tenetur voluptate deserunt nihil quibusdam. Expedita, architecto omnis?</p>
            <button onClick={onBack}>Back</button>
            <section>
                <button ><Link to={`/mail/${mail.prevMailId}`}>Prev mail</Link></button>
                <button ><Link to={`/mail/${mail.nextMailId}`}>Next mail</Link></button>
            </section>
        </section>
    )
}