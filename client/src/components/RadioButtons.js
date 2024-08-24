import React from 'react'

function RadioButtons({ names, selected, setSelected, runFn }) {
    const handleChange = (e) => {
        setSelected(e.target.value)
    }
    return (
        <div className='bg-secondary w-auto p-2 pr-4 rounded-md flex flex-row justify-evenly space-x-3'>
            {names.map((name, index) => {
                
                return (
                <label key={-index} className='text-white text-lg hover:text-gray-400 hover:cursor-pointer'>
                    <input type="radio" value={name}
                        checked={selected === name}
                        onChange={handleChange} 
                        className='mx-2 hover:cursor-pointer'/>
                    {name}
                </label>)
            }
            )}
        </div>

    )
}

export default RadioButtons