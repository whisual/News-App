import React from 'react'
import logo from '../assets/pngegg.png'
import front from '../assets/_122062811_mail-nc.png'
import {signInWithPopup} from 'firebase/auth'
import {auth, googleProvider } from '../firebase/Setup'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
  const navigate = useNavigate()

    const googleSignin = async() =>{
        try {
await signInWithPopup(auth, googleProvider)
auth.currentUser && navigate('/')
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <>
    <div className='grid grid-cols-2 bg-white h-screen'>
    <div className='text-center'>
<img className='h-21 w-36 ml-60 mt-11 ' src={logo} alt="" />
<h1 className='text-white text-3xl font-semibold mt-7'>Sign in</h1>
<button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full h-14 w-96 mt-14" onClick={googleSignin}>Sign in</button>
<h3 className='text-blue-500 underline mt-7'>Sign in now</h3>

        </div>
        <div>
<img src={front} alt="" />
        </div>
       
    </div>
    </>
  )
}

export default Signin
