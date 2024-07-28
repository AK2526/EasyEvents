import React from 'react'

function Errorbox({ title }) {
    if (title === "") {
        return <div></div>
    }
    else if (title === "Success!")
    {
        return <div className='bg-green-900 border-black border border-2 '>
            <p className='text-white text-center m-1'>{title}</p>
        </div>
    }
    return (
            <div className='bg-red-900 border-black border border-2 '>
                <p className='text-white text-center m-1'>{title}</p>
            </div>


    )
}

export default Errorbox