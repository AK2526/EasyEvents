import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

function Datepick({setStringDate}) {

    
  const [date, setDate] = useState(null)

  const handleDate = () => {
    if (date) {
      setStringDate(dayjs(date).format('YYYY/MM/DD'))
    }
    else{
        setStringDate(null)
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
  )
}

export default Datepick