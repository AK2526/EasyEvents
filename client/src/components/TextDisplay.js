import React from 'react'

function TextDisplay({data}) {
  return (
    <div>
        <textarea 
        className='w-full bg-white text-black p-2 rounded-md border font-bold resize-none' 
        rows={5}  value={data} 
        >{data} </textarea>
    </div>
  )
}

export default TextDisplay