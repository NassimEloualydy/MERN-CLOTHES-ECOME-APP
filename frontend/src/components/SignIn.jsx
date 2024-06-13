import React,{useState,useEffect} from 'react'
import Menu from './Menu'
import Breadcrumb from './Breadcrumb';

const handleChange=(e)=>{
    setLogin({...login,[e.target.name]:e.target.value});
}
const SignIn = () => {
    const [breadcumb,setBreadcumb]=useState(["Home"])
    const [menu,setMenu]=useState(false);
    const [login,setLogin]=useState({
        first_name:"",
        last_name:"",
        sexe:"",
        phone:"",
        date_of_birth:"",
        email:"",
        password:"",
    })
    const MenuSwitch=(data)=>{
        setMenu(!menu)
      }
    const SignUnUser=()=>{

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
                <h3 className='fw-bolder'>Sign In</h3>

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
                <h3>SignIn Form</h3>
              </div>
              <form action="">
              <div className="row col-md mt-2">
                  <div className="form-label">First Name</div>
                  <input type="text" name="first_name" value={login.first_name} onChange={handleChange}   className="form-control" />
                </div>

                <div className="row col-md mt-2">
                  <div className="form-label">Last Name</div>
                  <input type="text" name="last_name" onChange={handleChange} value={login.last_name}  className="form-control" />
                </div>
                <div className="row col-md mt-2">
                  <div className="form-label">Sexe</div>
                  <select onChange={handleChange} name="sexe"  value={login.sexe} className="form-control">
                  <option value="">Choose Your Sexe</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  </select>
                </div>
                <div className="row col-md mt-2">
                  <div className="form-label">Phone</div>
                  <input type="text" name="phone" value={login.phone} onChange={handleChange}  className="form-control" />
                </div>
                <div className="row col-md mt-2">
                  <div className="form-label">Date of birth</div>
                  <input type="date" name="date_of_birth"  onChange={handleChange}  value={login.date_of_birth} className="form-control" />
                </div>

                <div className="row col-md mt-2">
                  <div className="form-label">Email</div>
                  <input type="text" name="email" onChange={handleChange}  value={login.email} className="form-control" />
                </div>
                <div className="row col-md mt-2">
                  <div className="form-label">Password</div>
                  <input type="text" name="password" onChange={handleChange}  value={login.password} className="form-control" />
                </div>
                <div className="row col-md mt-2">
                  <input type="button" value="Sign In" onClick={SignUnUser} className="btn btn-dark" />
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

export default SignIn
