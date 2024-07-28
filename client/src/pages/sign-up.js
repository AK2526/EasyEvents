import React, { useContext, useState } from 'react'
import Button from '../components/Button'
import Formfield from '../components/Formfield'
import { Link, useNavigate } from 'react-router-dom'
import Errorbox from '../components/Errorbox'
import { signup } from '../lib/data'
import { UserContext } from '../App'

function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [error, setError] = useState("")

    const nav = useNavigate();

    const { user, setUser } = useContext(UserContext)

    const submit = async () => {
        try {
             if(await signup(email, password, username, setError)){
            nav('/')}
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='w-full py-[2%] items-center flex flex-row justify-center'>
        <div className='min-w-[400px]  bg-primary p-9 rounded-md flex flex-col space-y-5 shadow-2xl'>
            <h2 className='text-white text-2xl'>Sign Up</h2>
            <Formfield label="Email" value={email} setvalue={setEmail} placeholder="Type your email here" type/>
            <Formfield label="Password" value={password} setvalue={setPassword} placeholder="Type your password here" type="password"/>
            <Formfield label="Username" value={username} setvalue={setUsername} placeholder="Type your username here" />
            <Errorbox title={error}/>
            <Button title="Submit" styles="mt-3" fn={submit}/>
            <Link className='text-white underline w-full text-right' to="/sign-in">Already have an Account? Sign in.</Link>
        </div>
    </div>
    
  )
}

export default SignUp