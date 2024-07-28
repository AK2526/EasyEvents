import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App';
import { logout } from '../lib/data';



function Navbar() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext)
    return (
        <div className='w-full bg-primary sticky top-0 shadow-2xl'>
            <div className='px-6 py-2 flex-row flex items-center w-full justify-between'>
                <Link to="/"><img src={logo} alt="logo" className='max-h-14 justify-start' /></Link>
                <div className='space-x-4'>
                    <Link to="/create" className='text-white text-sm hover:text-gray-400'>Create</Link>
                    <Link to="/explore" className='text-white text-sm hover:text-gray-400'>Explore</Link>

                    {user.name === ""
                        ? <button onClick={() => { navigate("/sign-in") }} className='text-white bg-secondary rounded-md text-sm px-2 py-1 hover:bg-[#531F43]'>Sign In</button>
                        : <button onClick={() => { navigate("/profile") }} className='text-white bg-secondary rounded-md text-sm px-2 py-1 hover:bg-[#531F43]'>{user.name}</button>}
                    
                    {user.name === ""
                    ?<button onClick={() => { navigate("/sign-up") }} className='text-white bg-[#531F43]
                     rounded-md text-sm px-1 py-0.5 border-[3px] border-secondary '>Sign Up</button>
                     :<button onClick={() => { logout(setUser) }} className='text-white bg-[#531F43]
                     rounded-md text-sm px-1 py-0.5 border-[3px] border-secondary '>Log Out</button>}
                </div>
            </div>
        </div>
    )
}

export default Navbar