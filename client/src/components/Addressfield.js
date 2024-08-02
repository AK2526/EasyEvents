import React from 'react'
import Formfield from './Formfield'

function Addressfield({ location, setLocation, setGeoLoc }) {
    const handleBlur = async () => {
        try {
            const response = await fetch('/location/' + location);
            const data = await response.json();
            // Update the state variables with the fetched data
            setGeoLoc(data);
            if (data.name === undefined) {
                return;}
            setLocation(data.name + " (" + data.formatted_address + ")");
            console.log("Updated location")
        } catch (error) {
            console.error('Error fetching data:', error);
            setGeoLoc(null);
        }
    }
    return (

        <div className='space-y-2'>
            <h3 className='text-white text-xl font-semibold'>Location</h3>
            <input type="text" onFocus = {() =>setLocation("")}value={location} placeholder="Enter your location" onChange={(e) => setLocation(e.target.value)} onBlur={handleBlur} className='w-full bg-white text-black p-2 rounded-md border font-bold' />
        </div>
    )
}

export default Addressfield