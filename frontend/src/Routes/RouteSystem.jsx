import React,{useState} from 'react'
import Home from '../components/Home'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import SignIn from '../components/SignIn'
import Login from '../components/Login'
import ProductType from '../components/ProductType'
import PrivateRoute from './PrivateRoute'
import Product from '../components/Product'
const RouteSystem = () => {
  return (
    <div>
      <Router>
        <>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/SignIn" element={<SignIn/>} />
            <Route path="/Login" element={<Login/>} />
            <Route element={<PrivateRoute/>}>
              <Route path="/ProductType" element={<ProductType/>} />
            </Route>
            <Route element={<PrivateRoute/>}>
              <Route path="/Product" element={<Product/>} />
            </Route>

        </Routes>
        </>
      </Router>
    </div>
  )
}

export default RouteSystem
