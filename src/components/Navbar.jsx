import React from 'react'
import logo from '../assets/pngegg.png'
import user from '../assets/user-3296.png'
import search from '../assets/search-2903.png'
import { Link, useNavigate } from 'react-router-dom'
import {auth} from '../firebase/Setup'
import { signOut } from 'firebase/auth'

const Navbar = (props) => {
  const navigate = useNavigate()
    const logout = async() =>{
        try {
            await signOut(auth)
            navigate('/')
        } catch (error) {
            console.error(error)
        }
          
    }

  return (
   <>
   <div className='w-max grid grid-cols-3 bg-white fixed'>
    <div className='flex items-center'> 
<img src={logo} alt="" className='h-20' />
{auth.currentUser ? <button onClick={logout} className='flex hover:border border-black rounded-lg ml-2 p-2'>
    Logout</button> 
    : <Link to="/signin">
<button className='flex hover:border border-black rounded-lg ml-2 p-2'>
    <img src={user} alt="" className='h-6' />
    Sign in</button>
</Link> }
    </div>
<div className='flex'>
 <button onClick={()=> props.setMenu("All")} className='font-semibold text-sm'>
Home
 </button>
 <button onClick={()=> props.setMenu("Movies")} className='ml-6 font-semibold text-sm'>
   Movies 
 </button>
 <button onClick={()=> props.setMenu("Travel")} className='ml-6 font-semibold text-sm'>
  Travel  
 </button>
 <button onClick={()=> props.setMenu("Future")} className='ml-6 font-semibold text-sm'>
   Technology 
 </button>
 <button onClick={()=> props.setMenu("Foods")} className='ml-6 font-semibold text-sm'>
   Food 
 </button>
 <button onClick={()=> props.setMenu("Worklife")} className='ml-6 font-semibold text-sm'>
   Worklife 
 </button>
</div>
<div className='ml-40 flex items-center'>
<input onChange={(e)=> props.setSearch(e.target.value)} className='flex border-gray-300 cursor-text rounded-md text-center' type="text" placeholder='Search News' />
</div>
   </div>
   </>
  )
}

export default Navbar
