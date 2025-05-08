// import React from 'react'
// import {useEffect,useState} from 'react'
// import {useNavigate} from 'react-router-dom'
// import {useSelector} from 'react-redux'
// import { useDispatch } from 'react-redux'


// export default function Protected({children,
//     authenticated=true}) {
//         const navigate=useNavigate()
//         const [loading,setLoading]=useState(true)

//         const authStatus= useSelector((state)=>
//             state.auth.status
//         )
// useEffect(() => {
//     if(authenticated && authStatus!==authenticated){
//         navigate('/login')
//     }else if(  !authenticated &&  authStatus!==authenticated){
//         navigate('/')
//     }
//     setLoading(false)
    
// }, [authStatus,navigate,authenticated]);

//   return (
//     <div className='flex items-center justify-center w-full h-screen bg-gray-100'>
//         <div className='mx-auto w-full max-w-sm p-6 bg-white rounded-lg shadow-md border border-gray-300'>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 children
//             )}
//         </div>
//     </div>
//   )
// }

// export default AuthLayout


import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
       

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}