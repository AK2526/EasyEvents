import React, { useEffect, useState } from 'react'
import { getImageUrl } from '../lib/data'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

function EventSnap({ data }) {
    const [image, setImage] = useState(null)
    const initImage = async () => {
        getImageUrl(data.event_id).then((url) => {
            setImage(url)
        })
    }

    const nav = useNavigate()

    useEffect(() => {
        initImage()
    }
        , [])

    return (
        <div className='flex flex-col justify-between p-3 h-full border-gray-500 rounded-md border-2 shadow-lg hover:cursor-pointer hover:border-white'
        onClick={() => {nav(`/view/${data.event_id}`)}}
        title={data.quick_description}>
            <div>
                <h3 className='text-white text-2xl '>{data.event_name}</h3>
                <h4 className='text-gray-400 text-lg'>{data.short_address}</h4>
                </div>
            <div>
                {image && <img src={image} alt={data.event_name} className='w-full h-[200px] object-cover  mt-4' />}
                <p className='text-white text-center'>{dayjs(data.date, "YYYY-MM-DD").format("MMMM D, YYYY")}</p>
            </div>

        </div>
    )
}

export default EventSnap