import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate= useNavigate();
  const [values , setValues] = useState({
    email:'',
    password:''
  })

  const [message, setMessage] = useState(null);
  const [flag,setFlag]=useState(null);
  const handleChange = (e)=>{
    setValues({...values , [e.target.name]:e.target.value})
    setMessage(null)
  }

  const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch(`http://localhost:3000/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        })
        const result = await res.json()
        setMessage(result.message);
        setFlag(result.flag)
        navigate('/')
        localStorage.setItem("token", result.token);

        
    }


  return (
    <div className='flex justify-center items-center h-screen bg-gray-800 text-shadow-amber-50'>
      <div className='shadow-lg px-8 py-6 rounded-2xl w-110  bg-gray-700'>
        <h1 className='text-2xl font-bold mb-15 text-amber-50 text-center font-stretch-95%'>Welcome Back !!</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-5'>
            <label className='block text-amber-50 mb-1'>Email</label>
            <input placeholder='enter email' type='email' className='w-full px-3 py-2 border border-amber-100 rounded-xl text-blue-200' name='email' onChange={handleChange}/>
          </div>
          <div className='mb-16'>
            <label className='block text-amber-50 mb-1'>Password</label>
            <input placeholder='enter password' type='password' className='w-full px-3 py-2 border border-amber-100 rounded-xl text-blue-200' name='password' onChange={handleChange}/>
          </div>

          {
            message ? <div className={`font-semibold ${flag ? 'text-red-400' : 'text-green-400'} text-center mb-2`}>{message}</div> : null
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