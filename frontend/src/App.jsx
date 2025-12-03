import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'


import SubjectDetails from './pages/SubjectDetails'
import './App.css'
import Signup from './pages/signup'
import Login from './pages/login'
import Dashboard from './pages/Dashboard'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/subject/:id' element={<SubjectDetails />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
