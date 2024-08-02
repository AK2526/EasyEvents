import React from 'react'

function Button({ title, styles, fn, containerStyles="" }) {
    return (
        <div className={containerStyles}>
            <button onClick={() => { if (fn) { fn() } else { console.log(`Clicked ${title}`) } }} className={`text-white bg-secondary shadow-md rounded-md w-full text-lg px-2 py-1 hover:bg-[#531F43] ${styles}`}>{title}</button>
        </div>
    )
}

export default Button