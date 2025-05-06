import React from 'react'
import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'


function AuthLayout({children,
    authenticated=true}) {
        const navigate=useNavigate()
        const [loading,setLoading]=useState(true)

        const authStatus= useSelector((state)=>
            state.auth.status
        )
useEffect(() => {
    if(authenticated && authStatus!==authenticated){
        navigate('/login')
    }else if(  !authenticated &&  authStatus!==authenticated){
        navigate('/')
    }
    setLoading(false)
    
}, [authStatus,navigate,authenticated]);

  return (
    <div className='flex items-center justify-center w-full h-screen bg-gray-100'>
        <div className='mx-auto w-full max-w-sm p-6 bg-white rounded-lg shadow-md border border-gray-300'>
            {loading ? (
                <p>Loading...</p>
            ) : (
                children
            )}
        </div>
    </div>
  )
}

export default AuthLayout