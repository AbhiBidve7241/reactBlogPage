import React,{useState} from 'react'
import service from '../appwrite/auth'
import {Link,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import Input from './Input'
import  Button from './Button'
import Logo from './Logo'

import { useId } from 'react'


function SignUp() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {register,handleSubmit}=useForm()
    const [error,setError]=useState('')


    const create=async (data)=>{
        setError('')
        try {
         const userData=await service.createAccount(data)
         if(userData){
            const userData = await service.getCurrentUser()
            if(userData) dispatch(login(userData))
            navigate('/')
         }
            
            
        } catch (error) {
            setError(error.message)
        }
    }

  return (
//     <div className='flex items-center justify-center w-full'>
// <div className='mx-auto w-full max-w-sm p-6 bg-white
//  rounded-lg shadow-md border border-gray-300'>
//     <div className='flex items-center justify-center mb-4 max-w-sm'>
//           <span className='inline-block text-2xl w-full mb-2 '>
//         {/* <Logo width='100%' /> */}
//         </span>

// </div>
//     <h1 className='text-2xl font-bold text-center mb-4'>Sign Up</h1>
//     <p className='text-sm text-center mb-4'>
//         Already have an account?
//         <Link to='/login'
//          className='text-blue-500 hover:underline'>Login</Link>
//         </p>
//         {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

//         <form onSubmit={handleSubmit(create)}>
//            <div className='space-y-4'>

//              <Input
//                 label="Name:" 
//                 placeholder='Enter your name'
//                 type='text'
//                 {...register('name', {required:true})}
//                 />
//                 <Input
//                 label="Email:"
//                 placeholder='Enter your email'
//                 type='email'
//                 {...register('email', {required:true,
//                     validate:{
//                         matchPattern:(value)=>
//                         /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || 'Invalid email address'
//                     }})}
//                 />
//                 <Input
//                 label="password:"
//                 placeholder='Enter your password'
//                 type='password'
//                 {...register('password', {required:true,
//                     validate:{
//                         matchPattern:(value)=>
//                         /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) || 'Password must be at least 8 characters long and contain at least one letter and one number'
//                     }})}
//                 />
//                 <Button
//                 type='submit'
//                 className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out'
//                 >Sign Up</Button>
//                 </div>
//         </form>






//     </div>
//        </div>
 // )
//

<div className="flex min-h-screen items-center justify-center bg-gray-100">
<div className="mx-auto w-full max-w-md rounded-xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
  {/* Header Section */}
  <div className="mb-6 text-center">
    <span className="inline-block text-3xl font-bold text-gray-800">
      <Logo width="100%" />
      Blog App
    </span>
    <h1 className="mt-2 text-2xl font-semibold text-blue-900">Create Your Account</h1>
    <p className="mt-2 text-sm text-gray-600">
      Already have an account?
      <Link to='/login' className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
       Login
      </Link>
    </p>
  </div>

  {/* Error Message */}
  {error && (
    <p className="mb-6 rounded-md bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-200">
      {error}
    </p>
  )}

  {/* Form */}
  <form onSubmit={handleSubmit(create)} className="space-y-5">
    <Input
      label="Name"
      placeholder="Enter your name"
      type="text"
      {...register('name', { required: true, })}
      />
    <Input
      label="Email"
      placeholder="Enter your email"
      type="email"
      {...register('email', {
        required: true,
        validate: {
          matchPattern: (value) =>
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || 'Invalid email address',
        },
      })}
    />
    <Input
      label="Password"
      placeholder="Enter your password"
      type="password"
      {...register('password', {
        required: true,
        validate: {
          matchPattern: (value) =>
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ||
            'Password must be at least 8 characters long and contain at least one letter and one number',
        },
      })}
      className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
    />
    <Button
      type="submit"
      className="w-full rounded-md bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
    >
      Create Account
    </Button>
  </form>
</div>
</div>
);
};

const SignUpContainer = SignUp
export default SignUpContainer