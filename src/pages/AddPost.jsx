import React from 'react'
import {Container,PostForm} from '../components/index'

function AddPost() {
  return (
    <div className='py-8'> 
        <Container>
            <h1 className='text-2xl font-bold text-center'>Add Post</h1>
            <PostForm/>
        </Container>
    </div>
  )
}

export default AddPost