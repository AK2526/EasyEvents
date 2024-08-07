import React, { useState } from 'react'
import Formfield from './Formfield'
import Errorbox from './Errorbox';

function Addressfield({ location, setLocation, setGeoLoc }) {

    const [error, setError] = useState("")
    
    const handleBlur = async () => {
        try {
            setError("green Checking location")
            const response = await fetch('/location/' + location);
            const data = await response.json();
            // Update the state variables with the fetched data
            setGeoLoc(data);
            if (data.name === undefined) {
                setError("Didn't find a location with that name")
                return;
            }
            setError("")
            setLocation(data.name + " (" + data.formatted_address + ")");
            console.log("Updated location")
        } catch (error) {
            console.error('Error fetching data:', error);
            setGeoLoc(null);
            setError("Couldn't fetch location data")
        }
    }
    return (

        <div className='space-y-2'>
            <h3 className='text-white text-xl font-semibold'>Location</h3>
            <input type="text" onFocus = {() =>setLocation("")}value={location} placeholder="Enter your location" onChange={(e) => setLocation(e.target.value)} onBlur={handleBlur} className='w-full bg-white text-black p-2 rounded-md border font-bold' />
            <Errorbox title={error}/>
        </div>
    )
}

export default Addressfield