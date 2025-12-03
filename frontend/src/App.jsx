import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './App.css'
import Login from './page/Login'
import Signup from './page/signup'
import Dashboard from './page/Dashboard'
import SubjectDetails from './page/SubjectDetails'



function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/subject/:id' element={<SubjectDetails />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
