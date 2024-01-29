import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, database } from '../firebase/Setup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Comments = (props) => {
const [comments, setComments] = useState("")
const [newsComments, setNewsComments] = useState([])

const addComment = async() =>{
    const newsDoc = doc(database,"News",`${props.url.substr(-10,10)}`)
    const commentsRef = collection(newsDoc,"Comments")
    auth.currentUser == !null && toast.warning("Please Login")
    try {
       auth.currentUser && await addDoc(commentsRef,{
            comments:comments,
            name:auth.currentUser.displayName,
            profileImg:auth.currentUser.photoURL
        })
        auth.currentUser && toast.success("Comment Added Successfully")
    } catch (error) {
        console.error(error);
    }
}
const showComments = async() =>{
    const newsDoc = doc(database,"News",`${props.url.substr(-10,10)}`)
    const commentsRef = collection(newsDoc,"Comments")
    try {
     const data = await getDocs(commentsRef)
     const filteredData = data.docs.map((doc)=>({
        ...doc.data(),
        id:doc.id
     }))
     setNewsComments(filteredData)
    } catch (error) {
        console.error(error);
    } 
}

useEffect(()=>{
  showComments()
},[newsComments])

  return (
    <div className='grid grid-rows-2'>
      <div className='p-5'>
        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Comments</label>
       <div className='flex'>
           <input onChange={(e)=> setComments(e.target.value)} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add Comment" required/>
           <button onClick={addComment} class="ml-2 bg-slate-500 hover:bg-green-700 text-gray-900 text-sm py-2 px-4 border-gray-300 rounded">Post</button>
       </div> 
     </div>
     <div className='h-2 p-4'>
        {newsComments.map((data)=>{
            return <>
            <div className='flex'>
            <img className='rounded-full w-5 h-5' src={data.profileImg} alt="" />
            <h4 className='font-semibold  ml-2 text-xs text-slate-300'>{data.name.toUppercase()}</h4>
            </div>
            <h6 className='ml-7'>{data.comments}</h6>
             </>
        })}
     </div>
     <ToastContainer autoClose={3000} />
    </div>
  )
}

export default Comments
