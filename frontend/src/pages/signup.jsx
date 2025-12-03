import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Signup() {
    const navigate = useNavigate();
    const [message, setMessage] = React.useState(null);
    const [values, setvalues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })
    const [flag, setFlag] = useState(null)

    const handleChanges = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
        setMessage(null)
    }
    console.log(values)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`https://ebook-h8w1.onrender.com/signup`, {
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
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("Signup error:", error);
            setMessage("Signup failed");
            setFlag("error");
        }
    }




    return (
        <div className="flex justify-center items-center h-screen bg-gray-50 font-sans">
            <div className="w-full max-w-md px-6">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">Create Account</h1>
                        <p className="text-slate-500 text-sm">Join EBook to store Notes</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-700 mb-1.5 text-sm font-medium">First Name</label>
                                <input
                                    placeholder="Deepak"
                                    type="text"
                                    name="firstName"
                                    onChange={handleChanges}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-700 mb-1.5 text-sm font-medium">Last Name</label>
                                <input
                                    placeholder="Pandey"
                                    type="text"
                                    name="lastName"
                                    onChange={handleChanges}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-slate-700 mb-1.5 text-sm font-medium">Email Address</label>
                            <input
                                placeholder="name@example.com"
                                type="email"
                                name="email"
                                onChange={handleChanges}
                                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-700 mb-1.5 text-sm font-medium">Password</label>
                            <input
                                placeholder="••••••••"
                                type="password"
                                name="password"
                                onChange={handleChanges}
                                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
                            />
                        </div>

                        {message && (
                            <div className={`p-3 rounded-lg text-sm font-medium text-center ${flag === 'error' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                                {message}
                            </div>
                        )}

                        <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all shadow-sm">
                            Create Account
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-500 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;
