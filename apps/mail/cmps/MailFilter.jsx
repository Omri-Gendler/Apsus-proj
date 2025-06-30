

const { useState, useEffect } = React

export function CarFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { txt } = filterByToEdit
    return (
        <section className="mails-filter container">
            <h2>Filter Our Cars</h2>
            <form >

                <label htmlFor="txt">Vendor</label>
                <input onChange={handleChange} value={txt} name="txt" id="txt" type="text" />

            </form>
        </section>
    )
}