import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import MasnoryLayout from './MasnoryLayout';
import Spinner from './Spinner';
import { Client } from './../Client';
import { AllPins, SearchQuery } from '../utils/data';
 


const Feed = () => {
  const [Loading, setLoading] = useState(false);
  const {categoryId} = useParams();
  const [Pins, setPins] = useState(null);

  
  useEffect(() => {
    setLoading(true);
    if(!categoryId){
     const  query =  AllPins ();

           Client.fetch(query).then(async (data)=>{
          //  await console.log(data);
           console.log(data);
            setLoading(false);
            setPins(data);
            console.log(Pins)
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
    }
    if(categoryId){
       const query = SearchQuery(categoryId);
          Client.fetch(query).then((data)=>{
            setLoading(false);
            setPins(data);
            console.log(data);
           
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      // console.log(getSearch+ "searching")
      
    }
     else{

     }
  
    
  }, [categoryId])
  
  if(Loading) return <Spinner message = 'We are adding new ideas to your Feed'/> 

  return (
    <div>{Pins && <MasnoryLayout pins ={Pins}/> }</div>
  )
}

export default Feed