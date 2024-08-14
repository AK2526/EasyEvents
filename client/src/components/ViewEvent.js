import React, { useEffect, useState } from 'react'
import { getImageUrl } from '../lib/data'
import dayjs from 'dayjs'
import Button from './Button'
import AddressView from './AddressView'
import ParagraphView from './ParagraphView'

function ViewEvent({ data }) {
    console.log(data)

    const [image, setImage] = useState(null)


    useEffect(() => {
        getImageUrl(data.event_id).then((url) => {
            setImage(url)
        })
    }, [])

    return (
        <div className='p-10 pt-10 space-y-10'>
            <div className=' flex flex-row w-full justify-between space-x-10'>
                <div className='flex flex-col justify-between w-full flex-1'>
                    <div className=''>
                        <h1 className='text-white font-bold text-4xl'>{data.event_name}</h1>
                        <h3 className='text-gray-400 text-2xl font-semibold'>{data.short_address}</h3>
                        <h3 className='text-white text-xl mt-2'>{dayjs(data.date, "YYYY-MM-DD").format("MMMM D, YYYY")}</h3>
                        <p className='text-white text-lg mt-4'>{data.quick_description}</p>
                    </div>
                    <div>
                        <Button title="Register" containerStyles='mt-10' />
                    </div>

                </div>
                <div className=' flex flex-row justify-end'>
                    {image && <img src={image} alt="Event Thumbnail" className='max-w-full h-[400px] border-primary rounded-md border-2' style={{ objectFit: "cover" }} />}
                </div>


            </div>

            <div className='space-y-4'>
                <h2 className='text-white text-3xl font-semibold text-center'></h2>
                <ParagraphView text={data.description} />
            </div>
            <div className=''>
                <h1 className='text-white text-xl font-semibold text-center'>{data.location_name}</h1>
                <AddressView address={data.formatted_address} />
            </div>

        </div>
    )
}

export default ViewEvent