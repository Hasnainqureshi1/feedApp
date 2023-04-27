import React  from 'react'
import { useNavigate } from 'react-router-dom'
import GoogleLogin from '@leecheuk/react-google-login'
import {FcGoogle} from 'react-icons/fc'
import loginVideo from '../assets/share.mp4'
import loginlogo from '../assets/logowhite.png'
import { gapi } from 'gapi-script';
import { useEffect } from 'react'
import { Client } from '../Client'
import { redirect } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    /* 
    What is GAPI script?
GAPI is Google's client library for browser-side JavaScript. It's used in Google Sign-in, Google Drive, and thousands of internal and external web pages for easily connecting with Google APIs.
    */
    gapi.load("client:auth2",()=>{
      gapi.auth2.init({clientId:process.env.REACT_APP_GOOGLE_CLIENT_ID})
    })
  
 
  },[] )
  
  const responseGoogle =async(response)=>{
     
    localStorage.setItem('user', JSON.stringify(response.profileObj));
    
    const {name, googleId, imageUrl} = response.profileObj;
    
    const doc = {
      _id: googleId,
      _type:'user',
      userName: name,
      image:imageUrl
    }
   
    Client.createIfNotExists(doc).then((response) => {
      navigate('/', {replace:true});
  }).catch((error) => {
      console.log("Error sending data: ", error.message);
      if (error.response && error.response.statusCode) {
          console.log(`Error code: ${error.response.statusCode}`);
      }
  });
  
  
  
    
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
        <div className='relative h-full w-full    ' >
            <video 
            src={loginVideo}
            type = 'video'
            loop 
            controls = {false}
            autoPlay  
            muted
            className = 'w-full h-full object-cover'

            ></video>

            <div className = 'absolute flex flex-col justify-center top-0 right-0 left-0 bottom-0 items-center bg-blackOverlay'>
              <div className="p-5">
                <img src={loginlogo} alt="logo" width='130px'  />
              </div>
              
              <div className="shadow-2xl">
               
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    render={(renderProps)=>(
                      <button style={{color:'black'}}
                      type='button'
                      className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none '
                      onClick = {renderProps.onClick}
                       disabled={renderProps.disabled}
                       
                      >
                        <FcGoogle className='mr-4'/>Sign in with google  
                      </button> 
  )}
                        onSuccess={responseGoogle}
                        onFailure= {responseGoogle}
                        cookiePolicy ='single_host_origin'
                />
              </div>
            </div>
        </div>

    </div>
  )
}

export default Login