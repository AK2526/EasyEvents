import React, { useEffect, useState } from 'react'
import { getNearbyEvents, getNextEvents, getPastEvents, getUpcomingEvents } from '../lib/data'
import GridView from '../components/GridView';
import Button from '../components/Button';
import RadioButtons from '../components/RadioButtons';
import { getLocation } from '../lib/address';

function Explore() {

    const [data, setData] = useState([])
    const [query, setQuery] = useState(null)
    const [moreToLoad, setMoreToLoad] = useState(true)
    const [filter, setfilter] = useState("Upcoming")
    const [locationLoaded, setlocationLoaded] = useState(false)
    const [loading, setloading] = useState(true)

    const initializeUpcoming = async () => {
        setData([])
        setQuery(await getUpcomingEvents(setData))
        setloading(false)
    }

    const initializePast = async () => {
        setData([])
        setQuery(await getPastEvents(setData))
        setloading(false)
    }

    const initializeNearby = async () => {
      setData([])
      let q = await getNearbyEvents(setData)
      if (q)
        {
          setQuery(q)
          setlocationLoaded(true)
        }
        else{
          setlocationLoaded(false)
        }
      setloading(false)
  }

    const update = async () => {
      setloading(true)
      if (query){
        setQuery(await getNextEvents(query, data, setData, setMoreToLoad))
      }
      else{
        setMoreToLoad(false)
      }
      setloading(false)
    }
 

    useEffect(() => {
      console.log(query)
    
    }, [query])

    useEffect(() => {
      setMoreToLoad(true)
      setloading(true)
      if (filter === "Upcoming")
      {
        initializeUpcoming()
      }
      else if (filter === "Past")
      {
        initializePast()
      }
      else if (filter === "Nearby")
      {
        initializeNearby()

      }
    
    }, [filter])

    useEffect(() => {
      getLocation()
    }, [])
    
    
    
    
  return (
    <div className='p-6'>
        {filter === "Upcoming" && <h1 className='text-white text-4xl font-semibold'>Explore Upcoming Events</h1>}
        {filter === "Past" && <h1 className='text-white text-4xl font-semibold'>Explore Past Events</h1>}
        {filter === "Nearby" && <h1 className='text-white text-4xl font-semibold'>Explore Nearby Events</h1>}
        <div className='flex-row flex justify-end'>
        <RadioButtons names={['Upcoming', 'Past', 'Nearby']} selected={filter} setSelected={setfilter} />
        </div>
        
        {data && <GridView datalist={data} />}
        
        {data.length == 0 && !loading && <h1 className='text-white text-2xl font-semibold text-center'>Error, Can't find any Events</h1>}
        {loading && <h1 className='text-white text-2xl font-semibold text-center'>Loading...</h1>}
        {data.length != 0 && moreToLoad && <Button title="Load More" containerStyles='mt-10' fn={update} multiple={true} />}
        
    </div>
  )
}

export default Explore