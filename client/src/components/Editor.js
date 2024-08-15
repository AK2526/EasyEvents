import React, { useEffect, useState } from 'react'
import Textfield from './Textfield';
import Datepick from './Datepick';
import Button from './Button';
import UploadImg from './UploadImg';
import Errorbox from './Errorbox';
import Formfield from './Formfield';
import Addressfield from './Addressfield';
import { eventExists, updateEvent, uploadImage } from '../lib/data';
import { useNavigate } from 'react-router-dom';
import { getAddressJson } from '../lib/address';

function Editor({event}) {

  const nav = useNavigate()
  console.log(event)

  const quicklen = 150;
  const desclen = 2000;

  const [name, setName] = useState(event.event_name)
  const [location, setLocation] = useState(event.location_name + " (" + event.formatted_address + ")")
  const [geoLoc, setGeoLoc] = useState(null)
  const [quickdesc, setQuickdesc] = useState(event.quick_description)
  const [desc, setDesc] = useState(event.description)
  const [date, setDate] = useState(event.date)
  const [file, setFile] = useState(null)
  const [error, setError] = useState("")
  const [isLoading, setisLoading] = useState(0)
  const [updatedImage, setUpdatedImage] = useState(false)

  const submit = async () => {
    
    setError("green Loading...")
    setError("")
    if (name === "" || location === "" || quickdesc === "" || desc === "" || date === null) {
      console.log(name, location, quickdesc, desc, date)
      setError("Please fill out all the fields")
      setisLoading(prev => prev + 1)
      return null
    }
    if (await eventExists(name)) {
      setError("An event with the same name already exists. Please choose a different name")
      setisLoading(prev => prev + 1)
      return null
    }
    let updatedInfo;
    setError("green Loading Location Information")
    if (location !== event.location_name + " (" + event.formatted_address + ")") {
      updatedInfo = await getAddressJson(geoLoc.place_id)
      if (updatedInfo.formatted_address=== undefined) {
        updatedInfo = {
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
    }
    if (updatedImage)
    {
      if (file)
        {
          updatedInfo = {...updatedInfo, "image_name" : file.name};
        }
        else
        {
          updatedInfo = {...updatedInfo, "image_name" : "Generated Image"};
        }
    }

    if (date !== event.date)
    {
      updatedInfo = {...updatedInfo, "date" : date};
    }

    setError("green Updating Event")

      await updateEvent({...updatedInfo, 
        event_name: name,
        quick_description: quickdesc,
        description: desc,
        
      }, event.event_id)

      
      if (file) {
        setError("green Uploading Image")
        console.log("Uploading Image")
        try {
          await uploadImage(file, event.event_id)
        } catch (error) {
          setError("Error Uploading Image")
        }
        
      }
      else if (updatedImage){
        setError("green Generating Image")
        await fetch("/genimg", {
          method: "POST",
          body: JSON.stringify({
            event_id: event.event_id,
            details: name + quickdesc,
            user_id: event.user_id
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(response => response.json()).then(data => console.log(data));
      }

    setError("green Done!")
    nav(`/view/${event.event_id}`)

  }

  return (
<div className='flex flex-col p-6 space-y-4 mb-10'>
      <h1 className='text-white text-4xl font-semibold '>Edit Event</h1>
      <Formfield label="Event Name" placeholder="Event Name" value={name} setvalue={setName} />
      <div className='flex-row flex space-x-4 '>
        <div className='w-[200%]'>
          <Addressfield location={location} setLocation={setLocation} setGeoLoc={setGeoLoc} />
        </div>
        
        <Datepick setStringDate={setDate} defaultDate={date}/>


      </div>

      <div className='w-[30%] space-y-2' >

      </div>
      <Textfield label="Quick Description" rows={2} value={quickdesc} setValue={setQuickdesc} max={quicklen} />
      <Textfield label="Description" rows={8} value={desc} setValue={setDesc} max={desclen} />
      
      
      <div className='space-y-8'>
        <div>
        <h3 className='text-white text-xl font-semibold'>Event Image</h3>
        <h2 className='text-gray-500 text-lg font-semibold'>Leave Empty for a Custom Image</h2></div>
        <div><UploadImg file={file} setFile={setFile} onlineFileName={event.event_id} onlineOGName={event.image_name} clientSetUpdate={setUpdatedImage}/></div>
        
      </div>

<div className='pt-8'><Errorbox title={error}/></div>
      

      <div className='w-full flex justify-center py-10'>
        <Button title="Update Event" styles="mt-3" containerStyles='justify-center w-[70%]'  setVisible={isLoading} fn={submit}/>
      </div>
    </div>
  )
}

export default Editor