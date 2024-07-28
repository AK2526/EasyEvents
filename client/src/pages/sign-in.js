import React, { useContext, useState } from 'react'
import Button from '../components/Button'
import Formfield from '../components/Formfield'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../lib/data'
import Errorbox from '../components/Errorbox'
import { UserContext } from '../App'

function SignIn() {
    const nav = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const { setUser } = useContext(UserContext)

    const submit = async () => {
        try {
            if (await login(email, password, setError))
                {
                    nav('/')
                }
            
            

        } catch (error) {
            console.log(error)
        }




    }

  return (
    <div className='w-full py-[4%] items-center flex flex-row justify-center'>
        <div className='min-w-[400px]  bg-primary p-9 rounded-md flex flex-col space-y-5 shadow-2xl'>
            <h2 className='text-white text-2xl'>Sign In</h2>
            <Formfield label="Email" value={email} setvalue={setEmail} placeholder="Type your email here" type/>
            <Formfield label="Password" value={password} setvalue={setPassword} placeholder="Type your password here" type="password"/>
            <Errorbox title={error}/>
            <Button title="Submit" fn={submit} styles="mt-3" />
            <Link className='text-white underline w-full text-right' to="/sign-up">Sign Up?</Link>
        </div>
    </div>
    
  )
}

export default SignIn