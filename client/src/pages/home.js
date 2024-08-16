import React from 'react'
import herocover from '../assets/herocover.jpg'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom';
import { getUpcomingEvents } from '../lib/data';

function Home() {
    const nav = useNavigate();


    return (
        <div className='p-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 justify-around'>
                <div className='flex flex-col justify-around'>
                    <div className='flex flex-col space-y-4 w-[100%]'>
                        <h1 className='text-white text-6xl font-semibold text-center md:text-left'>Effortless Event Management at Your Fingertips</h1>
                        <p className='text-white text-lg font-semibold text-center md:text-left'>Create, manage, and promote events seamlessly with EasyEvents. Your go-to platform for stress-free event planning.</p>
                    </div>
                </div>
                <div>
                    <img src={herocover} alt="hero cover" className='w-full h-96 object-cover rounded-lg shadow-lg' />
                </div>
            </div>

            <div>
                <Button title="Create an Event today!" fn={() => { nav("/create") }} containerStyles='my-10' />
            </div>

            <div>
                <p className='text-white text-center text-xl'>From intimate gatherings to grand conferences, EasyEvents streamlines the event planning process. Focus on what matters most—making your event a success.</p>
            </div>

        </div>
    )
}

export default Home