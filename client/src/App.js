import React, { useEffect, useState, createContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import { getUsername, sendAuth } from './lib/data';
import { onAuthStateChanged } from 'firebase/auth';
import Create from './pages/create';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import EventFullPage from './pages/event-full';
import Explore from './pages/explore';
import Profile from './pages/profile';
import Edit from './pages/edit';




//Will be using useContext
export const UserContext = createContext();
function App() {
  document.body.style = 'background: #071C28;';
  const [user, setUser] = useState({name: "", email: "", userId: "", auth: sendAuth(), loggedIn: false}) 

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <UserContext.Provider value={{user, setUser}}>
      <Router>
        <Navbar />
        <Routes>

          <Route path="/" element={<div className=' text-white '><h1 >HOME PAGE</h1></div>} />
          <Route path="/about" element={<h1>ABOUT PAGE</h1>} />
          <Route path="/sign-in/:prev?" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view/:id" element={<EventFullPage />}/>
          <Route path="/explore" element={<Explore/>} />
          <Route path="/profile/:uid" element={<Profile />}/>
          <Route path="/edit/:id" element={<Edit />}/>
        </Routes>
      </Router>
    </UserContext.Provider>
    </LocalizationProvider>
  )
}

export default App