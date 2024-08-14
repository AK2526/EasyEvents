import React, { useEffect, useState } from 'react'
import { getNextEvents, getPastEvents, getUpcomingEvents } from '../lib/data'
import GridView from '../components/GridView';
import Button from '../components/Button';
import RadioButtons from '../components/RadioButtons';

function Explore() {

    const [data, setData] = useState([])
    const [query, setQuery] = useState(null)
    const [moreToLoad, setMoreToLoad] = useState(true)
    const [filter, setfilter] = useState("Upcoming")

    const initializeUpcoming = async () => {
        setData([])
        setQuery(await getUpcomingEvents(setData))
    }

    const initializePast = async () => {
        setData([])
        setQuery(await getPastEvents(setData))
    }

    const update = async () => {
        setQuery(await getNextEvents(query, data, setData, setMoreToLoad))
    }
 

    useEffect(() => {
      console.log(query)
    
    }, [query])

    useEffect(() => {
      setMoreToLoad(true)
      if (filter === "Upcoming")
      {
        initializeUpcoming()
      }
      else if (filter === "Past")
      {
        initializePast()
      }
    
    }, [filter])
    
    
    
  return (
    <div className='p-6'>
        {filter === "Upcoming" && <h1 className='text-white text-4xl font-semibold'>Explore Upcoming Events</h1>}
        {filter === "Past" && <h1 className='text-white text-4xl font-semibold'>Explore Past Events</h1>}
        <div className='flex-row flex justify-end'>
        <RadioButtons names={['Upcoming', 'Past', 'Nearby']} selected={filter} setSelected={setfilter} />
        </div>
        
        {data && <GridView datalist={data} />}
        {moreToLoad && <Button title="Load More" containerStyles='mt-10' fn={update} multiple={true} />}
    </div>
  )
}

export default Explore