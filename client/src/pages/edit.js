import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getEventInfo } from '../lib/data';
import { UserContext } from '../App';
import Editor from '../components/Editor';

function Edit() {
    const { id } = useParams();

    const [loading, setLoading] = useState(true)
    const [event, setEvent] = useState("")

    const nav = useNavigate();

    const quicklen = 150;
    const desclen = 2000;


    const { user, setUser } = useContext(UserContext)

    const loadInfo = async () => {
        setEvent(await getEventInfo(id))
        setLoading(false)

    }
    useEffect(() => {
        loadInfo();
    }
        , [])

    useEffect(() => {
        if (event === "")
        {
            return;
        }
        else if (!event) {
            nav('/explore')
            return;
        }
        if (user.userId !== event.user_id || !user.loggedIn) {
            nav('/sign-in')
        }
    }, [event])

    return (
        <div>
            {loading
                ? <h1 className='text-white text-4xl font-semibold'>Loading...</h1>
                : 
                <div>
                    {event && <Editor event={event} />}
                </div>}
        </div>
    )
}

export default Edit