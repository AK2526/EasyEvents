import React from 'react'

export default function Formfield({label, value, setvalue, placeholder, type="text"}) {
  return (
    <div className='space-y-2'>
        <h3 className='text-white text-xl font-semibold'>{label}</h3>
        <input type={type} value={value} placeholder={placeholder? placeholder : "Type here"} onChange={(e) => setvalue(e.target.value)} className='w-full bg-white text-black p-2 rounded-md border font-bold'/>
    </div>
  )
}
