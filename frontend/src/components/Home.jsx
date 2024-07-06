import React,{useState,useEffect} from 'react'
import Menu from './Menu'
import Breadcrumb from './Breadcrumb';

const Home = () => {
    const [breadcumb,setBreadcumb]=useState(["Home"])
    const [menu,setMenu]=useState(false);
    
    const MenuSwitch=(data)=>{
        setMenu(!menu)
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
                <h3 className='fw-bolder'>Sigma Shop</h3>
                
            </div>
        </div>

    </div>

    </>
  )
}

export default Home
