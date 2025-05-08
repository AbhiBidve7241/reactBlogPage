import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Input,Button,Logo} from './index'
import { useDispatch } from 'react-redux'
import service from '../appwrite/conf'
import { useForm } from 'react-hook-form'


 export default function Login() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {register,handleSubmit}=useForm()
    const [error,setError]=useState('')
    const login =async (data)=>{
        setError('')
        try{
         const session= await service.login(data)
         if(session){
            const userData=await service.getCurrentUser()
            if(userData)dispatch(authLogin(userData))
                navigate('/')

                }
            }
         

        
        catch(error){
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center w-full'>
<div className='mx-auto w-full max-w-sm p-6 bg-white rounded-lg shadow-md'>
    <div className='flex items-center justify-center mb-4 max-w-sm'>
          <span className='inline-block text-2xl w-full mb-2 '>
        <Logo width='100%' />
        </span>

    </div>
    <h1 className='text-2xl font-bold text-center mb-4'>Login</h1>
    <p className='text-sm text-center mb-4'>
        Don't have an account?
        <Link to='/signup'
         className='text-blue-500 hover:underline'>Register</Link>
        </p>
        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

        <form onSubmit={handleSubmit(login)} className='mt-8 space-y-6'>    
            <div className='space-y-4'>
                <Input
                label="Email:" 
                placeholder='Enter your email'
                type='email'
                {...register('email', {required:true,
                    validate:{
                        matchPattern:(value)=>
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) 
                        || 'Invalid email address'
                    }
                })}
                
                
                />
                <Input 
                label="Password:"
                placeholder='Enter your password'
                type='password'
                {...register('password', {required:true,
                    validate:{
                        matchPattern:(value)=>
                        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) 
                        || 'Password must be at least 8 characters long and contain at least one letter and one number'
                    }
                })}
                {...register('password', {required:true}
                
)}
/>

<Button
type='submit'
>Login</Button>
                </div>

        </form>

    </div>
    </div>

  )
}


const LoginContainer = Login
export {LoginContainer}