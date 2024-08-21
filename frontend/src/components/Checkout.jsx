import React,{useState,useEffect} from 'react'
import Menu from './Menu'
import { useNavigate,useParams } from 'react-router-dom';
import { API_URL } from '../config/config'
import toastr from 'toastr'
import Breadcrumb from './Breadcrumb';
// import DropIn from 'braintree-web-drop-in-react';
// import {DropIn} from 'braintree-web-drop-in'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {PaymentElement} from '@stripe/react-stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import paymentComponent from './paymentComponent';
const stripe= await loadStripe("pk_test_51Pn4iDHcKVRDweYXVWq8IY9iemhtaWDhGZB08n2317nf67GfNd4VtwWVMcx000EQkyX8diAwBJDLKZahXjueWPBM00uk4ALoRS")

const Checkout = () => {
    const [breadcumb,setBreadcumb]=useState(["Home","Paiment"])
    const [products,setProducts]=useState([]);
    const navigate=useNavigate()


    const [menu,setMenu]=useState(false);
    const [token,setToken]=useState("")
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
          if(res.client_secret)
            setToken(res.client_secret)
          else  
          console.log(res);
        })
  
  },[])
  const options = {
    // passing the client secret obtained from the server
    clientSecret: 'pi_3Pn6FbHcKVRDweYX0Om9vCI2_secret_6eda67rfcSo8oQOCnJ0DHbIx6',
  };
  const cunfirmPayment= async (e)=>{
    e.preventDefault();
    // console.log(e)
    // const data = await stripe.confirmCardPayment('pi_3Pn6FbHcKVRDweYX0Om9vCI2_secret_6eda67rfcSo8oQOCnJ0DHbIx6',{
    //   payment_method: 'pi_3PojW2HcKVRDweYX1AIDj1PJ',

    // });
    // console.log(data)
    var Field_numberInput=document.getElementById("Field-numberInput");
    var Field_expiryInput=document.getElementById("Field-expiryInput");
    var Field_cvcInput=document.getElementById("Field-cvcInput");
    var Field_countryInput=document.getElementById("Field-countryInput");
    alert(Field_numberInput)
    alert(Field_expiryInput)
    alert(Field_cvcInput)
    alert(Field_countryInput)
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
              <form >
              <Elements stripe={stripe} options={options}>
              <form>
      <PaymentElement />
      <button className="btn btn-dark mt-3" onClick={cunfirmPayment}>Submit</button>
    </form> 
       </Elements>
                {/* <div className="row col-md mt-2">
                  <div className="form-label">Email</div>
                  <input type="text" name="email"    className="form-control" />
                </div>
                <div className="row col-md mt-2">
                  <div className="form-label">Password</div>
                  <input type="text" name="password"    className="form-control" />
                </div> */}
                  {/* <DropIn
            options={{ authorization: token }}
            onInstance={(instance) => (this.instance = instance)}
          /> */}
                {/* <div className="row col-md mt-2">
                  <input type="button" value="Login"  className="btn btn-dark" />
                </div> */}
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
