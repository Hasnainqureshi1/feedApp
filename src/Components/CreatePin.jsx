import React, { useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { Client } from '../Client'
import Spinner from './Spinner'
import { categories } from '../utils/data'


const CreatePin = ({user}) => {
  const [title, settitle] = useState('');
  const [imageAsset, setimageAsset] = useState(null)
  const [destination, setdestination] = useState('');
  const [about, setabout] = useState('');
  const [loading, setloading] = useState(false);
  const [fields, setfields] = useState(false);
  const [category, setcategory] = useState(null);
  const [WrongImageType, setWrongImageType] = useState(null);

  const navigate = useNavigate();

  const UploadImage=(e)=>{

    let {type,name} = e.target.files[0];
    // console.log(selected)
    if(type==='image/jpg' || type==='image/jpeg' || type==='image/png' || type==='image/gif' || type==='tif'){
      setWrongImageType(false);
        setloading(true)
      Client.assets.upload('image',e.target.files[0],{
        contentType:type,
        filename:name
      } ).then((document)=>{
        console.log(document);
          setimageAsset(document);
          setloading(false);
          console.log(imageAsset);
      })      
    }
    else{
      setWrongImageType(true);
    }
  }
  const SavePin =()=>{
    if(title && destination && category && imageAsset?._id && about){
      const doc ={
          _type:'pin',
          title,
          about,
          destination,
          category,
          image:{
            _type:'image',
            asset:{
              _type:'reference',
              _ref:imageAsset?._id
            }
          },
          postedby:{
            _type:'postedby',
            _ref:user?._id
          }
      }
      Client.create(doc)
      .then(()=>{
        navigate('/');
      })
    }
    else{
      setfields(true)
      setTimeout(() => {
          setfields(false);
      }, 2000);
    }

  }
  
  return (
    <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5  bg-gray-50' >
       {fields&&(
            <p className='text-red-500 text-center transition-all ease-in duration-150 mb-5 text-xl '>Please fill in all the fields</p>
       )}
       <div className='lg:flex-row flex-col flex lg:p-5 p-3 justify-center items-center bg-white lg:w-4/5 w-full' >
              <div className='flex bg-secondaryColor p-3 flex-0.7 w-full'>
                <div className='flex items-center justify-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420'>
                  {loading&& (<Spinner/>)}
                  {WrongImageType &&( <p>Wrong image type</p> )}
                  {!imageAsset ? (
                    <label htmlFor='upload-image'  >
                      <div className='flex justify-center items-center h-full  flex-col'>
                          <div className='flex flex-col justify-center items-center cursor-pointer'>
                            <p className='font-bold  text-2xl'>
                              <AiOutlineCloudUpload/>
                            </p>
                            <p className='text-lg'>Click to Upload</p>
                          </div>
                        <p className='mt-32 text-gray-400'>Use high quality SVG JPG PNG GIFF less than 20mb</p>
                      </div>
                      <input type="file" name="upload-image" id="upload-image" className='w-0 h-0' onChange={UploadImage} />
                      </label>
                  ):(
                    <div className = 'relative h-full'>
                      <img src={imageAsset?.url} alt="uploaded-image" className='w-full h-full' /> 
                        <button
                          type='button'
                          onClick={()=>{setimageAsset(null)}}
                          className='absolute bottom-5 right-5 p-3 text-xl rounded-full bg-white text-dark font-bold cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out '
                        >
                              <MdDelete/>
                        </button>
                    </div>
                  )}
                </div>
              </div>
                    {/* form  */}
               <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full '>
                <input type="text"
                  value={title}
                  onChange={(e)=>{settitle(e.target.value)}} 
                  placeholder='Add your title here...' 
                  className='outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2'              
                />
                {user&&(
                  <div className='flex gap-2 my-2 items-center  bg-white rounded-lg'>
                      <img src={user.image} alt="user-Profile"
                        className='w-10 h-10 rounded-full'
                      />
                      <p className='font-bold'> {user.userName} </p>
                  </div>
                )}
                 <input type="text"
                  value={about}
                  onChange={(e)=>{setabout(e.target.value)}} 
                  placeholder='What is your pin about...' 
                  className='outline-none text-base sm:text-lg   border-b-2 border-gray-200 p-2'              
                />
                 <input type="text"
                  value={destination}
                  onChange={(e)=>{setdestination(e.target.value)}} 
                  placeholder='Add your destination link...' 
                  className='outline-none text-base sm:text-lg   border-b-2 border-gray-200 p-2'              
                />
                <div className ='flex flex-col'>
                  <div>
                    <p className='mb-2 font-semibold text-lg sm:text-xl'>Choose Pin Category</p>
                    <select name="category" id="category"
                            className='outline-none w-4/5 border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'
                          onChange={(e)=>{
                            setcategory(e.target.value);
                          }}
                   >
                        <option value="other" className='bg-white'>Select the category</option>
                    {categories.map((category)=>{
                      return(
                            <option value={category.name} className='bg-white capitalize outline-none text-dark text-base border-0'>{category.name}</option>
                      )
                    })}
                    </select>
                  </div>
                  <div className='flex justify-end items-end mt-5'>
                      <button
                        type='button'
                        onClick={SavePin}
                        className='bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none'
                      >
                            Save Pin
                      </button>
                  </div>

                </div>
                </div>     
              
       </div>
    </div>
  )
}

export default CreatePin