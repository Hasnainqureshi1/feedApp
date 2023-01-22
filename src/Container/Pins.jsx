import React, { useState } from 'react'
import { Routes,Route } from 'react-router-dom';
import {PinDetails, Search , Feed , Navbar,CreatePin} from '../Components'

const Pins = ({user}) => {
  const [SearchTerm, setSearchTerm] = useState('')
  return (
    <div className='px-2 md:px-5 w-full'>
      <div className='bg-gray-50 w-full'>
        <Navbar SearchTerm = {SearchTerm} setSearchTerm= {setSearchTerm} user = {user}/>
      </div>
      <div className='h-full w-full '>
        <Routes>
          <Route path='/' element={<Feed/>}/>
          <Route path='/category/:categoryId' element={<Feed/>}/>
          <Route path='/pin-details/:PinId' element={<PinDetails user = {user && user}/>}/>
          <Route path='/create-pin' element={<CreatePin user = {user && user }/>}/>
          <Route path='/search' element={<Search SearchTerm = {SearchTerm} setSearchTerm= {setSearchTerm} />}/>
        </Routes>

      </div>
      </div>
  )
}

export default Pins