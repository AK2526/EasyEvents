import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import Errorbox from './Errorbox'

function Datepick({ setStringDate, defaultDate=null }) {


  const [date, setDate] = useState(defaultDate? dayjs(defaultDate): null)
  const [error, setError] = useState("")

  const handleDate = () => {
    if (date === null) {
      setStringDate(null)
    }
    else if ( date.isBefore(dayjs(), 'day'))
    {
      console.log(dayjs())
      setError("Please choose a date in the future")
      setStringDate(null)
    }
    else {
      setStringDate(dayjs(date).format('YYYY/MM/DD'))
      setError("")
    }

  }

  useEffect(() => {
    handleDate()
  }, [date])


  return (
    <div className='space-y-2 w-full'>
      <h3 className='text-white text-xl font-semibold'>Date</h3>
      <DatePicker
        minDate={dayjs()}
        onChange={(d) => { setDate(d); console.log(d) }}
        defaultValue={dayjs(defaultDate)}

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
      <Errorbox title={error} />
    </div>
  )
}

export default Datepick