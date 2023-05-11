import React, { useState } from 'react'
import { Client, urlFor } from '../Client'
import { Link, useNavigate } from 'react-router-dom'
import {v4 as uuidv4} from 'uuid';
import {MdDownloadForOffline} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'
import { fetchUser } from '../utils/fetchUser';
// uuid provides unique ids 
const Pin = ({pin:{postedby,image, _id, destination ,save}}) => { //destructoring
  const [PostHovered, setPostHovered] = useState(false);
  const [SavingPost, setSavingPost] = useState(false)
  const navigate = useNavigate();
   const user = fetchUser();
  
   //to check the if user is already saved the post or not 
  const alreadySaved = !!(save?.filter((item)=>item.postedby._id === user.googleId))?.length;
  const savePin =(id)=>{
    setSavingPost(true);
     Client.patch(id).
     setIfMissing({save:[]})
     .insert('after', 'save[-1]',[{
      _key:uuidv4(),
      userId: user.googleId,
      postedby:{
        _type:'postedby',
        _ref:user.googleId
      }
     }])
     .commit()
     .then(()=>{
      window.location.reload();
      SavingPost(false);
     })

  }
  //save[-1]  meaning at the end
  const deletePin =(id)=>{
    Client.delete(id)
    .then(()=>{
      window.location.reload();
    })
  }

  return (
    <div className='m-2 '>
 
      <div
        onClick={()=>{navigate(`/pin-detail/${_id}`)}}
        onMouseEnter={(()=>{setPostHovered(true)})}
        onMouseLeave={(()=>{setPostHovered(false)})}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
      >
      {/* sanity way to use images effectively  :urlFor(image).width(250).url() */}
      <img className='rounded-lg w-full' alt='user-post' src={urlFor(image).width(250).url()} />
      {PostHovered && (
        <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pt-2 pr-2 pb-2  z-50 '
             style={{height: '100%'}}
        >
            <div className='flex items-center justify-between'>
              <div className='flex gap-2'>
                <a href={`${urlFor(image).url()}?dl`}
                  download 
                  onClick={((e)=>{e.stopPropagation();})}
                  className='bg-white w-9 h-9 rounded-full flex justify-center items-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                >
                  <MdDownloadForOffline/>
                </a>
              </div>
      {alreadySaved ?(
        <button type='button' className='bg-red-500 text-white px-5 py-1 rounded-3xl font-bold opacity-70 hover:opacity-100 text-base  hover:shadow-md outline-none' >{save?.length} Saved</button>
      ):
      (
        <button type='button' className='bg-red-500 text-white px-5 py-1 rounded-3xl font-bold opacity-70 hover:opacity-100 text-base  hover:shadow-md outline-none'
          onClick={(e)=>{
            e.stopPropagation()
            savePin(_id)
          }}
        >Save</button>
      )
      }
            </div>
            <div className='flex items-center justify-between  gap-2 w-full '>
      {destination && 
            <a href={destination}
            onClick={(e)=>{e.stopPropagation()}}
              target='_blank'
              rel='norefferer'
              className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md outline-none'
            >
                <BsFillArrowUpRightCircleFill/>
                {destination.length >20?destination.slice(8,20): destination.slice(8)}
            </a>
      }
      {postedby?._id === user.googleId && (
        <button
          onClick={(e)=> {
            e.stopPropagation()
            deletePin(_id);
          }}
            className='bg-white p-2   text-dark font-bold     rounded-full opacity-70 hover:opacity-100 hover:shadow-md outline-none'
        >
            <AiTwotoneDelete  />
        </button>
      )}
            </div>
        </div>
      )}
      </div>
      <div>
        <Link to={`user-profile/${postedby?._id}`} className='flex gap-2 mt-2 items-center  '>
            <img src={postedby?.image}  alt="user-profile" className='w-8 h-8 object-cover rounded-full' />
            <p className = 'font-semibold capatilize'>{postedby.userName}</p>
        </Link>
      </div>
    </div>
  )
}

export default Pin