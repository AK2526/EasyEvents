import React, { useContext, useEffect, useState } from 'react'
import Formfield from '../components/Formfield'
import Textfield from '../components/Textfield'
import { DatePicker, DesktopDatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import Addressfield from '../components/Addressfield'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import Button from '../components/Button'
import UploadImg from '../components/UploadImg'

function Create() {
  const nav = useNavigate();

  const quicklen = 150;
  const desclen = 2000;

  const { user, setUser } = useContext(UserContext)
  if (user.userId === "" || !user.loggedIn) {
    nav('/sign-in')
  }

  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [geoLoc, setGeoLoc] = useState(null)
  const [quickdesc, setQuickdesc] = useState("")
  const [desc, setDesc] = useState("")
  const [date, setDate] = useState(dayjs())

  useEffect(() => {
    console.log("Name: ", name)
    console.log("Location: ", location)
    console.log("GeoLoc: ", geoLoc)
    console.log("Quick Description: ", quickdesc)
    console.log("Date", date)

  }, [name, location, geoLoc, date])


  return (
    <div className='flex flex-col p-6 space-y-4 mb-10'>
      <h1 className='text-white text-4xl font-semibold '>Create Event</h1>
      <Formfield label="Event Name" placeholder="Event Name" value={name} setvalue={setName} />
      <div className='flex-row flex space-x-4 '>
        <div className='w-[200%]'>
          <Addressfield location={location} setLocation={setLocation} setGeoLoc={setGeoLoc} />
        </div>
        <div className='space-y-2 w-full'>
          <h3 className='text-white text-xl font-semibold'>Date</h3>
          <DatePicker
            minDate={dayjs()}
            value={date}
            onAccept={(d) => setDate(d)}
            
            slotProps={{
              textField: {
                sx: {
                  color: '#ffffff',
                  borderRadius: '5px',
                  borderWidth: '0px',
                  borderColor: '#ffffff',
                  border: '1px solid',
                  backgroundColor: '#ffffff',
                  width: '100%',
                  textDecoration: 'bold',
                },
                size: 'small',
              },

            }}
          />

        </div>


      </div>

      <div className='w-[30%] space-y-2' >

      </div>
      <Textfield label="Quick Description" rows={2} value={quickdesc} setValue={setQuickdesc} max={quicklen} />
      <Textfield label="Description" rows={8} value={desc} setValue={setDesc} max={desclen} />
      
<UploadImg />

      <div className='w-full flex justify-center'>
        <Button title="Create Event" styles="mt-3" containerStyles='justify-center w-[70%]' fn={() => { console.log("Create Event") }} />
      </div>
    </div>
  )
}

export default Create