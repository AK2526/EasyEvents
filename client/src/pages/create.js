import React from 'react'
import Formfield from '../components/Formfield'
import Textfield from '../components/Textfield'

function Create() {
  return (
    <div className='flex flex-col p-6 space-y-4'>
        <h1 className='text-white text-4xl font-semibold '>Create Event</h1>
        <Formfield label="Event Name" placeholder="Event Name"/>
        <div className='flex-row flex space-x-4 '>
            <div className='w-full'>
            <Formfield label="Location" placeholder="City, State"/>
            </div>
            <div className='w-[60%]'>
            <Formfield label="Date" placeholder="Month Day, Year"/>
            </div>
            
        </div>
        <Textfield label="Quick Description"/>
        
    </div>
  )
}

export default Create