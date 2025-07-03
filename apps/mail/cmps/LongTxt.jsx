const { useState, useEffect, useRef } = React

export function LongTxt({ children, length = 100 }) {
    const txt = children
    const [isShowFullTxt, setIsShowFullTxt] = useState(false)

    function onToggleIsShowFullTxt() {
        setIsShowFullTxt(prev => !prev)
    }

    const isLongText = txt.length > length
    const textToShow = (isShowFullTxt || !isLongText) ? txt : (txt.substring(0, length)) + '...'
    return (
        <section className="long-txt">
            <p className="txt" >{textToShow}</p>
            {isLongText &&
                <div>
                    <button className="show-txt-btn" onClick={onToggleIsShowFullTxt}>
                        {isShowFullTxt ? 'Show Less' : 'Read More'}
                    </button>
                </div>
            }
        </section>
    )
}