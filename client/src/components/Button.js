import React, { useEffect, useState } from 'react'

function Button({ title, styles, fn, containerStyles="", multiple=false, setVisible=null }) {
    const [disable, setDisable] = useState(false)
    
    
    useEffect(() => {
        setDisable(false)
        console.log("Visibe?", setVisible)
    }, [setVisible])

    useEffect(() => {
        console.log(disable)
    }, [disable])
    return (
        <div className={containerStyles}>
            <button disabled={disable} onClick={() => {if(!multiple){setDisable(true)}; if (fn && !disable) { fn() } else { console.log(`Clicked ${title}`) };}} className={`text-white bg-secondary shadow-md rounded-md w-full text-lg px-2 py-1 hover:bg-[#531F43] disabled:opacity-10 ${styles}`}>{title}</button>
        </div>
    )
}

export default Button