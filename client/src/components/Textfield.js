import React, { useState } from 'react'

function Textfield({label, placeholder, rows, value, setValue, max}) {
  const [remaining, setRemaining] = useState(max? max: 100)
  return (
    <div className='space-y-2'>
         <h3 className='text-white text-xl font-semibold'>{label}</h3>
        <textarea 
        className='w-full bg-white text-black p-2 rounded-md border font-bold resize-none' 
        rows={rows? rows: 3} maxLength={max? max: 100} value={value} 
        onChange={(e) => {setValue(e.target.value); setRemaining(max - e.target.value.length)}}
        placeholder={placeholder? placeholder: "Type here..."}></textarea>
        <p className='text-right text-white '>Remaining characters: {remaining}</p>
    </div>
  )
}

export default Textfield