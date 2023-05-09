import React from 'react'
import Masonry from 'react-masonry-css';
import Pin from './Pin';

const laybreakpoints = {
  default :4,
  3000:6,
  2000:4,
  1200:3,
  1000:2,
  500:1,
}
const MasnoryLayout = ({pins}) => {
   console.log(pins)
  return (
     <Masonry className='flex animation-slide-fwd' breakpointCols={laybreakpoints}>
      {pins?.map((pin)=>{
         return(
           <Pin key={pin._id} pin ={pin} className='w-max p-2 bg-red-500' style={{width:'25%'}} /> 
  )
      })}
     </Masonry>
  )
}

export default MasnoryLayout