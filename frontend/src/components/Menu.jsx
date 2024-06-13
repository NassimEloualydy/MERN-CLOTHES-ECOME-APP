import React from 'react'
import { useNavigate } from 'react-router-dom'

const Menu = () => {
    const navigate=useNavigate()
    const NavigateUrl=(data)=>{
        navigate(data);
    }
  return (
    <>
     <h3>Menu</h3>   
     <div onClick={NavigateUrl.bind(this,"/SignIn")} className="itemMenu">Sign In</div>
     <div onClick={NavigateUrl.bind(this,"/Login")} className="itemMenu">Login</div>

    </>
  )
}

export default Menu
