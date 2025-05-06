import React,{useEffect,useState} from 'react'
import { Container,PostForm } from '../components/index'
import service from '../appwrite/conf'
import { combineReducers } from '@reduxjs/toolkit'
import { useParams,useNavigate } from 'react-router-dom'

function EditPost() {
    const [post,setPost] = useState(null)
    const {slug}= useParams()
    const navigate= useNavigate()

    useEffect(() => {
        if(slug){
            service.getPost(slug).then((post)=>{
                if(post){
                    setPost(post)
                }
            })
            }else{
                    navigate('/')
                }
                
        
            },[slug,navigate])




            return post?(
                <div className='py-8'> 
                <Container>
                    <h1 className='text-2xl font-bold text-center'>Edit Post</h1>
                    <PostForm post={post} setPost={setPost}/>
                </Container>
                </div>
            ) :null
            
        }
      
    
      
    
 

export default EditPost