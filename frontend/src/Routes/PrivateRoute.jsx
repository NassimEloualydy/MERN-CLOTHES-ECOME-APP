import React from 'react'
import {Navigate,Outlet} from "react-router-dom"

const isAuth=()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    if(user)
        return user
    return false
}
const PrivateRoute = () => {
  return isAuth() ?<Outlet/>:<Navigate to='/'/>
}

export default PrivateRoute
