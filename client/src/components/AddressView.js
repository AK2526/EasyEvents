import React from 'react'

function AddressView({ address }) {
    const arr = address.split(',');
  return (
    <div>
        {
            arr.map((item, index) => {
                return (
                    <p key={index} className='text-gray-300 text-center text-lg'>{item},</p>
                )
            })
        }
    </div>
  )
}

export default AddressView