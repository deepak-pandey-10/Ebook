import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router'

function Login() {
  const [values , setValues] = useState({
    email:'',
    password:''
  })

  const [message, setMessage] = useState(null);

  const handleChange = (e)=>{
    setValues({...values , [e.target.name]:e.target.value})
    setMessage(null)
  }
  console.log(values)


  return (
    <div className='flex justify-center items-center h-screen bg-gray-800 text-shadow-amber-50'>
      <div className='shadow-lg px-8 py-6 rounded-2xl w-110  bg-gray-700'>
        <h1 className='text-2xl font-bold mb-15 text-amber-50 text-center font-stretch-95%'>Welcome Back !!</h1>
        <form>
          <div className='mb-5'>
            <label className='block text-amber-50 mb-1'>Email</label>
            <input placeholder='enter email' type='email' className='w-full px-3 py-2 border border-amber-100 rounded-xl text-blue-200' name='email' onChange={handleChange}/>
          </div>
          <div className='mb-16'>
            <label className='block text-amber-50 mb-1'>Password</label>
            <input placeholder='enter password' type='password' className='w-full px-3 py-2 border border-amber-100 rounded-xl text-blue-200' name='password' onChange={handleChange}/>
          </div>

          {
            message ? <div className='font-semibold text-red-400 text-center mb-2'>{message}</div> : null
          }

          <button className='w-full bg-indigo-600 text-white py-2 mb-4 rounded-2xl'>Submit</button>
        </form>
        <div className='text-center'>
          <span className='text-amber-50'>Don't have an account? </span>
          <Link to='/signup' className='text-blue-500'>Create One</Link>
        </div>
      </div>
    </div>
  )
}

export default Login