import React, { useState } from 'react'
import { Link } from 'react-router'
// import axios from 'axios'

function Signup() {
    const [message, setMessage] = React.useState(null);
    const [values, setvalues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })
    const [flag,setFlag] = useState(null)

    const handleChanges = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
        setMessage(null)
    }
    console.log(values)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch(`https://ebook-h8w1.onrender.com/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        })
        const result = await res.json()
        setMessage(result.message);
        setFlag(result.flag)
        
    }




    return (
        <div className='flex justify-center items-center h-screen bg-gray-800 text-shadow-amber-50'>

            <div className='shadow-lg px-8 py-5 rounded-2xl w-110 h-160 bg-gray-700'>
                <h1 className='text-2xl font-bold mb-15 text-amber-50 text-center font-stretch-95%'>Create Your Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-amber-50 mb-1'>First Name</label>
                        <input placeholder='enter first name' type='text' className='w-full px-3 py-2 border border-amber-100 rounded-xl text-blue-200' name='firstName' onChange={handleChanges} />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-amber-50 mb-1'>Last Name</label>
                        <input placeholder='enter last name' type='text' className='w-full px-3 py-2 border border-amber-100  rounded-xl text-blue-200' name='lastName' onChange={handleChanges} />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-amber-50  mb-1'>Email</label>
                        <input placeholder='enter email' type='email' className='w-full px-3 py-2 border border-amber-100  rounded-xl text-blue-200' name='email' onChange={handleChanges} />
                    </div>
                    <div className='mb-15'>
                        <label className='block text-amber-50  mb-1'>Password</label>
                        <input placeholder='enter password' type='password' className='w-full px-3 py-2 border border-amber-100  rounded-xl text-blue-200' name='password' onChange={handleChanges} />
                    </div>
                    {
                        message ? <div className={`font-semibold ${flag ? 'text-red-400' : 'text-green-400'} text-center mb-2`}>{message}</div> : null
                    }
                    <button className='w-full bg-indigo-600 text-white py-2 mb-4 rounded-2xl'>Submit</button>
                </form>
                <div className='text-center'>
                    <span className='text-amber-50'>Already have account? </span>
                    <Link to='/login' className='text-blue-500'>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup



// import React, { useState } from 'react'
// import { Link } from 'react-router'
// import axios from 'axios'

// function Signup() {

//     const [values, setValues] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         password: ''
//     })

//     const handleChanges = (e) => {
//         setValues({ ...values, [e.target.name]: e.target.value })
//     }
//     console.log(values)
//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         try {
//             const res = await fetch("http://localhost:3000/signup", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(values)
//             })

//             const data = await res.json()
//             console.log(data)

//         } catch (err) {
//             console.error("Signup failed:", err)
//         }
//     }

//     return (
//         <div className='flex justify-center items-center h-screen bg-gray-300'>
//             <div className='shadow-lg px-8 py-5 border w-96 bg-red-400'>
//                 <h1 className='text-lg font-bold mb-4 text-center'>Create Your Account</h1>

//                 <form onSubmit={handleSubmit}>
//                     <div className='mb-4'>
//                         <label className='block text-gray-700 font-semibold'>First Name</label>
//                         <input placeholder='enter first name' type='text' className='w-full px-3 py-2 border'
//                             name='firstName' onChange={handleChanges} />
//                     </div>

//                     <div className='mb-4'>
//                         <label className='block text-gray-700 font-semibold'>Last Name</label>
//                         <input placeholder='enter last name' type='text' className='w-full px-3 py-2 border'
//                             name='lastName' onChange={handleChanges} />
//                     </div>

//                     <div className='mb-4'>
//                         <label className='block text-gray-700 font-semibold'>Email</label>
//                         <input placeholder='enter email' type='email' className='w-full px-3 py-2 border'
//                             name='email' onChange={handleChanges} />
//                     </div>

//                     <div className='mb-6'>
//                         <label className='block text-gray-700 font-semibold'>Password</label>
//                         <input placeholder='enter password' type='password' className='w-full px-3 py-2 border'
//                             name='password' onChange={handleChanges} />
//                     </div>

//                     <button className='w-full bg-indigo-600 text-white py-2 mb-4'>Submit</button>
//                 </form>

//                 <div className='text-center'>
//                     <span>Already have account? </span>
//                     <Link to='/login' className='text-blue-500'>Login</Link>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Signup
