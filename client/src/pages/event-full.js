import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getEventInfo } from '../lib/data';
import ViewEvent from '../components/ViewEvent';

function EventFullPage() {
    const { id } = useParams();

    const [loading, setLoading] = useState(true)
    const [event, setEvent] = useState(null)

    const loadInfo = async () => {
        setEvent(await getEventInfo(id))
        setLoading(false)
        
    }

    useEffect(() => {
        console.log(event)
    }
    , [event])

    useEffect(() => {
        loadInfo();
    }
        , [])


    return (
        <div className='w-full'>
            {loading ?

                <h1 className='text-white text-2xl text-center w-full p-20'>Loading Event...</h1>

                :
                <div className='w-full'>
                    {
                        event
                            ?
                            <ViewEvent data={event} />
                            :
                            <div>
                                <h1 className='text-white text-4xl text-center w-full pt-20 font-bold'> 404 </h1>
                                <h1 className='text-white text-2xl text-center w-full'>Event does not exist</h1>
                            </div>

                    }
                </div>


            }
        </div>
    )
}

export default EventFullPage