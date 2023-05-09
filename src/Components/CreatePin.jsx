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
    if(type==='image/jpg' || type==='image/jpeg' || type==='image/png' || type==='image/gif'){
      setWrongImageType(false);
        setloading(true)
      Client.assets('image',e.target.files[0],{
        contentType:type,
        filename:name
      } ).then((document)=>{
          setimageAsset(document);
          setloading(false);
      })      
    }
    else{
      setWrongImageType(true);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5  ' >
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
                      <input type="file" name="upload-image" id="upload image" className='w-0 h-0' onChange={UploadImage} />
                      </label>
                  ):(
                    <p>something else</p>
                  )}
                </div>
              </div>
       </div>
    </div>
  )
}

export default CreatePin