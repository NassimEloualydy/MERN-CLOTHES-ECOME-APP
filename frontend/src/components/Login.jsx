import React,{useState,useEffect} from 'react'
import Menu from './Menu'
import Breadcrumb from './Breadcrumb';
import {API_URL} from '../config/config'
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr'
const Login = () => {
    const [breadcumb,setBreadcumb]=useState(["Home"])
    const [menu,setMenu]=useState(false);
    const navigate=useNavigate()
    const handleChange=(e)=>{

      setLogin({...login,[e.target.name]:e.target.value})
    }
    const [login,setLogin]=useState({
        email:"",
        password:"",
    })
    const MenuSwitch=(data)=>{
        setMenu(!menu)

      }
    const SignUnUser=()=>{
        fetch(`${API_URL}/user/login`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(login)
        }).then(res=>res.json()).then(res=>{
          if(res.err)
            toastr.warning(res.err,"Warming",{positionClass:"toast-bottom-right"})
          if(res.data){
            localStorage.setItem("user",JSON.stringify(res))
            toastr.success("Sign in with success","Success",{positionClass:"toast-bottom-right"})
            navigate('/')
          }
        }).catch(err=>console.log(err))
    }
  return (
    <>
                <div className={menu?"menu":"hide_menu"}>
              <span onClick={MenuSwitch.bind(this,false)} className="close_menu">
              {/* <ion-icon name="close-outline"></ion-icon> */}
              </span>
              <br />
              <br />
              <Menu/>
              <span className="iconmenu" onClick={MenuSwitch.bind(this,true)}>

<ion-icon name="menu-outline"></ion-icon>
    </span>

        </div>
        <div className="headerSearchInfo">
        <br />
        <br />
        <div className="container border border-white text-light pb-3 rounded-3">
            <div className="p-2">
                <h3 className='fw-bolder'>Login Form</h3>

            </div>
        </div>

    </div>
    <Breadcrumb PathPage={breadcumb} ActivePage="Sign In"/>
    <section className="m-3">
      <div className="container">
        <div className="row">
          <div className="card col-md-6 mx-auto">
            <div className="card-body">
              <div className="card-title">
                <h3>Login Form</h3>
              </div>
              <form action="">
                <div className="row col-md mt-2">
                  <div className="form-label">Email</div>
                  <input type="text" name="email" onChange={handleChange}  value={login.email} className="form-control" />
                </div>
                <div className="row col-md mt-2">
                  <div className="form-label">Password</div>
                  <input type="text" name="password" onChange={handleChange}  value={login.password} className="form-control" />
                </div>
                <div className="row col-md mt-2">
                  <input type="button" value="Login" onClick={SignUnUser} className="btn btn-dark" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    </>
  )
}

export default Login
