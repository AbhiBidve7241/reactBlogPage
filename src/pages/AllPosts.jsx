import React,{useState,useEffect} from 'react'
import service from '../appwrite/conf'
import { Container,PostCard } from '../components/index'

function AllPosts() {
    const [posts,setPosts] = useState([])
    useEffect(()=>{},[])
    service.getPosts([]).then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }
    })

  return (
    <div className='w-full py-8'>
        <Container>
            <h1 className='text-2xl font-bold text-center'>All Posts</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {posts.map((post)=><PostCard key={post.$id} post={post}/>)}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts