import React from 'react'
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({SearchTerm,setSearchTerm, user}) => {
  const navigate = useNavigate();
  if(!user)return null;
  return (
    
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7  justify-center items-center'>
      <div className='flex justify-start items-center w-full px-3 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
        <IoMdSearch fontSize={21}  className='ml-1'/>
        <input 
        type="text" 
        value={SearchTerm}
        onChange={(e)=>{ setSearchTerm(e.target.value)}}
        placeholder='Search'
        onFocus={()=>{}}
        className=' w-full p-2 bg-white outline-none'
        />
      </div>
      <div className='flex gap-3 '>
        <Link to ={`user-profile/${user?._id}`} className='hidden md:block'>
            <img src={user.image} alt="user-image" className='w-14 h-13 rounded-lg'/>       
        </Link>
        <Link to ={`create-pin`} className='bg-black text-white rounded-lg w-10 h-11 items-center md:w-14 flex justify-center mr-2'>
           <IoMdAdd/>      
        </Link>
      </div>
       </div>
  )
}

export default Navbar