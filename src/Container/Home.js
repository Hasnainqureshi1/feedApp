import React, {useState,useRef, useEffect} from 'react'
import {HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import { Link,Route,Routes } from 'react-router-dom'
import logo from '../assets/logo.png'
import {UserProfile , SideBar} from './../Components/';

import { Client } from '../Client'
import Pins from './Pins'
import data from '../utils/data'
import {userQuery} from './../utils/data';

const Home = () => {
  const [ToggleSideBar, setToggleSideBar] = useState(false);
  const [user, setUser] = useState('');
  const scrollRef = useRef(null)
  
  const UserInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')):localStorage.clear;
 console.log(user.image);
  
  useEffect(() => {
  const query  = userQuery(UserInfo?.googleId);
 
  Client.fetch(query)
        .then((data) =>{
          console.log(data[0]);
          setUser(data[0]);
        } )     
  }, [])
  useEffect(() => {
  console.log(scrollRef.current);   
  }, [])

  
  


  return (
<>

    <div className='flex bg-black-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
        <div className='hidden md:flex h-screen flex-initial'>
          <SideBar user = {user && user}/>
        </div>
        <div className='flex md:hidden  flex-initial'>
          {/* ------------------- Mobile sidebar -----------------  */}
          <div className = "pd-2 w-full flex flex-row justify-between items-center shadow-md">

          <HiMenu fontSize={40} className='cursor-pointer' onClick={()=>setToggleSideBar(true)}/>
          <Link to= '/'>
              <img src={logo} alt="ShareMe" className='w-28' />          
          </Link>
          <Link to= {`user-profile/${user._id}`}>
              <img src={user.image} alt="Profile" className='w-28 ' />          
          </Link>
          </div>
        {ToggleSideBar && (
          <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in '>
            <div className='absolute w-full flex justify-end items-center p-2'>
              <AiFillCloseCircle fontSize={30} className= 'cursor-pointer' onClick={()=>{setToggleSideBar(false)}}/>
            </div>
            {/* -------------Desktop Sidebar -------------------- */}
              <SideBar user = {user && user } closeToggle = {setToggleSideBar}/>
          </div>
        )}
        </div>
        <div className='pb-2 flex h-screen w-full' ref={scrollRef}>
          <Routes>
          <Route path = "/user-profile/:userId" element ={<UserProfile/>}/> 
          <Route path = "/*" element ={<Pins user = {user && user}/>}/> 
          
            </Routes>

        </div>
    </div>
    </>
  )
}
 
export default Home