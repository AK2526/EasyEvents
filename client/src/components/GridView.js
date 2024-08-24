import React from 'react'
import EventSnap from './EventSnap'

function GridView({datalist}) {


  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8  mt-8'>
        {datalist.map((item, index) => {
            return (
                <div key={index} className='h-full'>
                    <EventSnap data={item.data()} />
                </div>
            )
        }
    )}
    </div>
  )
}

export default GridView