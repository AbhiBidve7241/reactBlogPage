import React,{useState} from 'react'
import service from '../appwrite/conf'
import {Link,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'


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
    <div className='flex items-center justify-center w-full'>
<div className='mx-auto w-full max-w-sm p-6 bg-white
 rounded-lg shadow-md border border-gray-300'>
    <div className='flex items-center justify-center mb-4 max-w-sm'>
          <span className='inline-block text-2xl w-full mb-2 '>
        <Logo width='100%' />
        </span>

</div>
    <h1 className='text-2xl font-bold text-center mb-4'>Sign Up</h1>
    <p className='text-sm text-center mb-4'>
        Already have an account?
        <Link to='/login'
         className='text-blue-500 hover:underline'>Login</Link>
        </p>
        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

        <form onSubmit={handleSubmit(create)}>
           <div className='space-y-4'>

             <Input
                label="Name:" 
                placeholder='Enter your name'
                type='text'
                {...register('name', {required:true})}
                />
                <Input
                label="Email:"
                placeholder='Enter your email'
                type='email'
                {...register('email', {required:true,
                    validate:{
                        matchPattern:(value)=>
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || 'Invalid email address'
                    }})}
                />
                <Input
                label="password:"
                placeholder='Enter your password'
                type='password'
                {...register('password', {required:true,
                    validate:{
                        matchPattern:(value)=>
                        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) || 'Password must be at least 8 characters long and contain at least one letter and one number'
                    }})}
                />
                <Button
                type='submit'
                className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out'
                >Sign Up</Button>
                </div>
        </form>






    </div>
       </div>
  )
}

export default SignUp