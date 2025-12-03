import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const [message, setMessage] = useState(null);
  const [flag, setFlag] = useState(null);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    setMessage(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // const res = await fetch(`https://ebook-h8w1.onrender.com/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(values)
    // })

    const res = await fetch(`http://localhost:3000/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
    const result = await res.json()
    setMessage(result.message);
    setFlag(result.flag)
    if (result.success) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate('/dashboard')
    }


  }


  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 font-sans">
      <div className="w-full max-w-md px-6">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-500 text-sm">Sign in to continue to EBook</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-slate-700 mb-1.5 text-sm font-medium">Email Address</label>
              <input
                placeholder="name@example.com"
                type="email"
                name="email"
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-1.5 text-sm font-medium">Password</label>
              <input
                placeholder="••••••••"
                type="password"
                name="password"
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
              />
            </div>

            {message && (
              <div className={`p-3 rounded-lg text-sm font-medium text-center ${flag === 'error' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                {message}
              </div>
            )}

            <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all shadow-sm">
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login