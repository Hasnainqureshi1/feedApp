import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import MasnoryLayout from './MasnoryLayout';
import Spinner from './Spinner';
import { Client } from './../Client';
import { SearchQuery } from '../utils/data';


const Feed = () => {
  const [Loading, setLoading] = useState(false);
  const {categoryId} = useParams();
  
  useEffect(() => {
    setLoading(true);
    if(categoryId){
       const query = SearchQuery(categoryId);
          Client.fetch(query).then((data)=>{
              console.log(data);
          })
      // console.log(getSearch+ "searching")
      
    }
     else{

     }
  
    
  }, [categoryId])
  
  if(Loading) return <Spinner message = 'We are adding new ideas to your Feed'/> 

  return (
    <div>Feed</div>
  )
}

export default Feed