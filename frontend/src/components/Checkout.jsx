import React,{useState,useEffect} from 'react'
import Menu from './Menu'
import { useNavigate,useParams } from 'react-router-dom';
import { API_URL } from '../config/config'
import toastr from 'toastr'
import Breadcrumb from './Breadcrumb';
// import DropIn from "braintree-web-drop-in-react";
const Checkout = () => {
    const [breadcumb,setBreadcumb]=useState(["Home","Paiment"])
    const [products,setProducts]=useState([]);
  const navigate=useNavigate()
  const [menu,setMenu]=useState(false);
   const MenuSwitch=(data)=>{
    setMenu(!menu)
  }
  useEffect(()=>{
    fetch(`${API_URL}/braintree/generateToken`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
        })
  
  },[])
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
                <h3 className='fw-bolder'>Checkout</h3>
            </div>
        </div>

    </div>
          <Breadcrumb PathPage={breadcumb} ActivePage="Checkout"/>
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
                  <input type="text" name="email"    className="form-control" />
                </div>
                <div className="row col-md mt-2">
                  <div className="form-label">Password</div>
                  <input type="text" name="password"    className="form-control" />
                </div>
                <div className="row col-md mt-2">
                  <input type="button" value="Login"  className="btn btn-dark" />
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

export default Checkout
