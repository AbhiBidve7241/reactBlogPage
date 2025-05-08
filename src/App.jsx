// import React, { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'
// import authService from './appwrite/auth';
// import { login,logout } from './store/authSlice';
// import './App.css'

// import { Outlet } from 'react-router-dom'
// import Header from './components/Header/Header'
// import Footer from './components/Footer/Footer'
// function App() {
 
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();

//   useEffect(()=>{
//     authService.getCurrentUser()
//     .then((userData)=>{
//       if(userData){
//         dispatch(login({userData}));

//       }
//       else{
//         dispatch(logout());
//       }

//     })
//     .finally(()=>{
//       setLoading(false);
//     })
//   },[])

//  return !loading? (
//   <div className=' min-h-screen flex flex-col items-center bg-yellow-400'> 
//     <h1 className='text-red-500'>Welcome </h1>
//     <div className='w-full  flex  justify-center ' >
//       <Header></Header> 
//        <main>
//         <Outlet></Outlet>
//       </main>
//       <Footer></Footer>
//     </div>
    
//   </div>
//  ) : (
//   <div className='min-h-screen flex flex-col items-center justify-center'>
//     <h1>Loading...</h1>
//   </div>
//  )
// }

// export default App


import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function App() {
  return  (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* This renders the child routes */}
      </main>
      <Footer />
    </div>
  )
  
}

export default App



//test
// import Header from './components/Header/Header'
// export default function App() {
//   return <Header />
// }