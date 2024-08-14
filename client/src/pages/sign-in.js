import React, { useContext, useState } from 'react'
import Button from '../components/Button'
import Formfield from '../components/Formfield'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getUsername, login, sendAuth } from '../lib/data'
import Errorbox from '../components/Errorbox'
import { UserContext } from '../App'

function SignIn() {
    const nav = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const [updateButton, setUpdateButton] = useState(0)

    const { setUser } = useContext(UserContext)

    const { prev } = useParams();

    const submit = async () => {
        try {
            let k = await login(email, password, setError)
            let u = k.user
            if (u)
                {
                    setError("green Success!")
                    setUser({name: await getUsername(u.uid), email: u.email, userId: u.uid, auth: sendAuth(), loggedIn: true})
                    if (prev)
                    {
                        
                        nav('/'+prev)
                    }
                    else{

                        nav('/')
                    }
                }

            else{
                setUpdateButton(prev => prev + 1)
                setUser({name: "", email: "", userId: "", auth: sendAuth(), loggedIn: false})
            }
            
            

        } catch (error) {
            console.log(error)
            setUpdateButton(prev => prev + 1)
        }




    }

  return (
    <div className='w-full py-[4%] items-center flex flex-row justify-center'>
        <div className='min-w-[400px]  bg-primary p-9 rounded-md flex flex-col space-y-5 shadow-2xl'>
            <h2 className='text-white text-2xl'>Sign In</h2>
            <Formfield label="Email" value={email} setvalue={setEmail} placeholder="Type your email here" type/>
            <Formfield label="Password" value={password} setvalue={setPassword} placeholder="Type your password here" type="password"/>
            <Errorbox title={error}/>
            <Button title="Submit" fn={submit} styles="mt-3" setVisible={updateButton}/>
            <Link className='text-white underline w-full text-right' to="/sign-up">Sign Up?</Link>
        </div>
    </div>
    
  )
}

export default SignIn