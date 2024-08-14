import React from 'react'

function ParagraphView({ text }) {
    const arr = text.split('\n');
  return (
    <div className=''>
        {
            arr.map((item, index) => {
                return (
                    <div> 
                        <p key={index} className='text-white text-lg'>{item}</p>
                        <br />
                    </div>
                    
                )
            })
        }
    </div>
  )
}

export default ParagraphView