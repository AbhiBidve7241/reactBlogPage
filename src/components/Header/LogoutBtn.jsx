import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'

function LogoutBtn() {
    const dispatch =useDispatch();
    const handleLogout =()=>{
        authService.logout().then(()=>{
            dispatch(logout());
    })}
  return (
    <div className='text-white hover:text-gray-200 px-4 py-2 rounded-md' 
    >LogoutBtn</div>
  )
}

export default LogoutBtn