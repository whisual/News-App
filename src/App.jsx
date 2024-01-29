import { useState } from 'react'
import './App.css'
import Signin from './components/Signin'
import Navbar from './components/Navbar'
import Main from './components/Main'
import NewsDetails from './components/NewsDetails'
import {Route, Routes} from 'react-router-dom'

function App() {

  return (
    <>
    <Routes>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/' element={<Main/>} />
      <Route path='/details' element={<NewsDetails/>}/>
    </Routes>
      {/* <Signin /> */}
    </>
  )
}

export default App
