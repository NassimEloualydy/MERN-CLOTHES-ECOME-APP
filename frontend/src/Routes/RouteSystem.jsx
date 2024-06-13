import React,{useState} from 'react'
import Home from '../components/Home'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import SignIn from '../components/SignIn'
import Login from '../components/Login'
const RouteSystem = () => {
  return (
    <div>
      <Router>
        <>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/SignIn" element={<SignIn/>} />
            <Route path="/Login" element={<Login/>} />
        </Routes>
        </>
      </Router>
    </div>
  )
}

export default RouteSystem
