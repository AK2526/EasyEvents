import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../App'
import { getFutureUserPosts, getPastUserPosts, getUsername } from '../lib/data'
import GridView from '../components/GridView'

function Profile() {
    let { uid } = useParams()
    let { user } = useContext(UserContext)

    const [futureEvents, setFutureEvents] = useState([])
    const [pastEvents, setPastEvents] = useState([])
    const [userName, setUserName] = useState("")
    const [loading, setLoading] = useState(true)

    const initialize = async () => {
        setFutureEvents([])
        setPastEvents([])
        await getFutureUserPosts(uid, setFutureEvents)
        await getPastUserPosts(uid, setPastEvents)
        setUserName(await getUsername(uid))
        setLoading(false)
    }

    useEffect(() => {
        initialize()

    }, [uid])


    return (
        <div className='p-6'>
            {loading ? <h1 className='text-white text-4xl font-semibold'>Loading...</h1> :
                <div>
                    {userName === "Error" ? <h1 className='text-white text-4xl font-semibold'>User Not Found</h1> :
                        <div>
                            {user.userId === uid
                                ? <h1 className='text-white text-4xl font-semibold'>My Profile</h1>
                                : <h1 className='text-white text-4xl font-semibold'>{userName}'s Profile</h1>
                            }

                            <h1 className='text-white text-2xl font-semibold mt-8'>Upcoming Events</h1>
                            <GridView datalist={futureEvents} />
                            {futureEvents.length === 0 && <h1 className='text-white text-xl font-semibold text-center'>No Upcoming Events</h1>}
                            <h1 className='text-white text-2xl font-semibold mt-8'>Past Events</h1>
                            <GridView datalist={pastEvents} />
                            {pastEvents.length === 0 && <h1 className='text-white text-xl font-semibold text-center'>No Past Events</h1>
                            }

                        </div>

                    }

                </div>
            }




        </div>
    )
}

export default Profile