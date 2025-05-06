import React from 'react'
import service from '../appwrite/conf'
import { Link } from 'react-router-dom'




function PostCard(
    {
        $id,title,coverImage
    }
) {
  return (
   <Link to={`/post/${$id}`} className='w-full h-64 relative group'>
    <div className='w-full h-full absolute top-0 left-0 bg-black/50 group-hover:bg-black/30
     transition-all duration-300 ease-in-out z-10 flex items-center justify-center'>
         <img src={service.getFilePreview(coverImage)} alt={title}
          className='w-full h-full object-cover' />
          
        <h1 className='text-white text-2xl font-bold'>{title}</h1>
    </div>
   
   </Link>
  )
}

export default PostCard