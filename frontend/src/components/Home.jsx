import React,{useState,useEffect} from 'react'
import Menu from './Menu'

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
                <h3 className='fw-bolder'>Jobs</h3>
                <div className="container">
                    <form action="">
                        <div className="row text-center">
                            <div className="col-md mt-2"><input type="text" name="name" id=""   placeholder='Name' className="form-control" /></div>
                            <div className="col-md mt-2"><input type="text" name="description" id=""   placeholder='Description' className="form-control" /></div>
                            <div className="col-md mt-2"><input type="text" name="status" id=""   placeholder='Status' className="form-control" /></div>
                            <div className="col-md mt-2"><input type="text" name="company" id=""   placeholder='Company' className="form-control" /></div>
                        </div>
                        <div className="row text-center">
                            <div className="col-md mt-2"><input type="text" name="contract" id=""   placeholder='Contract' className="form-control" /></div>
                            <div className="col-md mt-2"><input type="text" name="date_publish" id=""   placeholder='Date Publish' className="form-control" /></div>
                            <div className="col-md mt-2"><input type="text" name="date_close" id=""   placeholder='Date Close' className="form-control" /></div>
                            <div className="col-md mt-2"><input type="text" name="category" id=""   placeholder='Category' className="form-control" /></div>
                        </div>
                        <div className="row text-center">
                            <div className="col-md mt-2">
                                <input type="button" value="Search"  className="btn btn-dark w-100" />
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>

    </div>

    </>
  )
}

export default Home
