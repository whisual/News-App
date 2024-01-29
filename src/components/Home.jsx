import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {setDoc} from "firebase/firestore"
import {database} from "../firebase/Setup"

const Home = (props) => {

    const [news, setNews] = useState([])

    const addNews = async(data) =>{
      const newsDoc = doc(database,"News", `${data.url.substr(-10,10)}`)
      try {
        await setDoc(newsDoc,{
          title:data.title,
          description:data.description
        })
      } catch (error) {
        console.error(error);
      }
      
    }

    const getNews = () =>{
        fetch(`https://newsapi.org/v2/everything?q=${props.menu ? props.menu : "All"}&sortBy=popularity&apiKey=20595fb76033412cb889ca14dfc49de0`)
        .then(res => res.json())
        .then(json => setNews(json.articles))
    }
    useEffect(() =>{
        getNews()
    },[])
    console.log(news);

  return (
 <div className='bg-white mt-12 p-5 grid grid-cols-3'>
    {news?.filter(data => data.title.includes(props.search)).map((data)=>{
        return <>
       <Link onClick={()=> addNews(data)} to='/details' state={{data:data}}> 
         <div class="max-w-sm rounded overflow-hidden shadow-lg">
           <img class="w-full" src={data.urlToImage}/>
            <div class="px-6 py-4">
                 <div class="font-bold text-xl mb-2">{data.title}</div>
                   <p class="text-gray-700 text-base">{data.content}</p>
                  <h3 className='font-bold'>-{data.author}</h3>
             </div>
         </div>
        </Link>
        </>
    })}
 </div>   
  )
}

export default Home
