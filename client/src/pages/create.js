import React, { useContext, useEffect, useState } from 'react'
import Formfield from '../components/Formfield'
import Textfield from '../components/Textfield'
import dayjs, { Dayjs } from 'dayjs'
import Addressfield from '../components/Addressfield'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import Button from '../components/Button'
import UploadImg from '../components/UploadImg'
import Datepick from '../components/Datepick'
import Errorbox from '../components/Errorbox'
import { addEvent, eventExists, getEventId, uploadImage } from '../lib/data'
import { getAddressJson } from '../lib/address'

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
  const [date, setDate] = useState(null)
  const [file, setFile] = useState(null)
  const [error, setError] = useState("")


  const submit = async () => {
    
    setError("green Loading...")
    setError("")
    if (name === "" || location === "" || quickdesc === "" || desc === "" || date === null) {
      setError("Please fill out all the fields")
      return null
    }
    if (await eventExists(name)) {
      setError("An event with the same name already exists. Please choose a different name")
      return null
    }
    setError("green Loading Location Information")
    let formatted_location = await getAddressJson(geoLoc.place_id)
    
    if (formatted_location.formatted_address=== undefined) {
      formatted_location = {
        location_name: location,
        formatted_address: "",
        short_address: "",
        coords: {
          latitude: 0,
          longitude: 0
        },
        place_id: "",
        hexhash: ""
      }}
      console.log(formatted_location)

      let eventId = await getEventId()
      console.log(file)
      if (file) {
        setError("green Uploading Image")
        console.log("Uploading Image")
        try {
          await uploadImage(file, eventId)
        } catch (error) {
          setError("Error Uploading Image")
        }
        
      }
      else{
        fetch("/genimg", {
          method: "POST",
          body: JSON.stringify({
            event_id: eventId,
            details: name + quickdesc,
            user_id: user.userId
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(response => response.json()).then(data => console.log(data));
      }

    setError("green Done!")

  }


  return (
    <div className='flex flex-col p-6 space-y-4 mb-10'>
      <h1 className='text-white text-4xl font-semibold '>Create Event</h1>
      <Formfield label="Event Name" placeholder="Event Name" value={name} setvalue={setName} />
      <div className='flex-row flex space-x-4 '>
        <div className='w-[200%]'>
          <Addressfield location={location} setLocation={setLocation} setGeoLoc={setGeoLoc} />
        </div>
        
        <Datepick setStringDate={setDate}/>


      </div>

      <div className='w-[30%] space-y-2' >

      </div>
      <Textfield label="Quick Description" rows={2} value={quickdesc} setValue={setQuickdesc} max={quicklen} />
      <Textfield label="Description" rows={8} value={desc} setValue={setDesc} max={desclen} />
      
      
      <div className='space-y-8'>
        <div>
        <h3 className='text-white text-xl font-semibold'>Event Image</h3>
        <h2 className='text-gray-500 text-lg font-semibold'>Leave Empty for a Custom Image</h2></div>
        <div><UploadImg file={file} setFile={setFile}/></div>
        
      </div>

<div className='pt-8'><Errorbox title={error}/></div>
      

      <div className='w-full flex justify-center py-10'>
        <Button title="Create Event" styles="mt-3" containerStyles='justify-center w-[70%]' fn={submit} />
      </div>
    </div>
  )
}

export default Create