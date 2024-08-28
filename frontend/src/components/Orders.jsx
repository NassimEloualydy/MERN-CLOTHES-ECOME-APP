import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import { API_URL } from "../config/config";
import toastr, { options } from "toastr";
import { CMultiSelect } from "@coreui/react-pro";
import "@coreui/coreui-pro/dist/css/coreui.min.css";
import { useNavigate } from 'react-router-dom'
import Breadcrumb from './Breadcrumb';

const Orders = () => {
    const navigate=useNavigate()

    const [breadcumb, setBreadcumb] = useState(["Home"]);
    const [menu, setMenu] = useState(false);
    const [categories, setCategories] = useState([]);
    var offset = 0;
    const [orders,setOrders]=useState([]);
    const [searchData,setSearchData]=useState({
        product:"",
        qte:"",
        first_name:"",
        last_name:"",
        status:"",
        date:"",
    })
    const handlChangeSearch=(e)=>{
        setSearchData({...searchData,[e.target.name]:e.target.value})
        
    }
    const getDataOrders=()=>{
        const {data}=JSON.parse(localStorage.getItem('user'));
        fetch(`${API_URL}/basket/getOrders/${offset}`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${data}`
            },
            body:JSON.stringify(searchData)
        }).then(res=>res.json()).then(res=>{
            if(res.data){
                setOrders(res.data)
            }else{
                console.log(res);
            }
        }).catch(err=>console.log(err))
    }
    const navigateData=(data)=>{
        if(data=="next"){
            alert(offset)
            offset=offset+6
        }
        if(data=="prev" && offset>0){
            offset=offset-6
        }
        getDataOrders()
      }
    
    
    const MenuSwitch = (data) => {
        setMenu(!menu);
      };
      useEffect(()=>{
        getDataOrders()
      },[])
  return (
    <>
            <div className={menu ? "menu" : "hide_menu"}>
        <span onClick={MenuSwitch.bind(this, false)} className="close_menu">
          {/* <ion-icon name="close-outline"></ion-icon> */}
        </span>
        <br />
        <br />
        <Menu />
        <span className="iconmenu" onClick={MenuSwitch.bind(this, true)}>
          <ion-icon name="menu-outline"></ion-icon>
        </span>
      </div>
      <div className="headerSearchInfo">
        <br />
        <br />
        <div className="container border border-white text-light pb-3 rounded-3">
          <div className="p-2">
            <h3 className="fw-bolder">Orders</h3>
            <div className="container">
              <form action="">
                <div className="row text-center">
                  <div className="col-md mt-2">
                    <input
                      type="text"
                      name="product"
                      placeholder="Product"
                      className="form-control"
                      value={searchData.product}
                      onChange={handlChangeSearch}
                    />
                  </div>
                  <div className="col-md mt-2">
                    <input
                      type="text"
                      name="qte"
                      placeholder="Qte"
                      className="form-control"
                      value={searchData.qte}
                      onChange={handlChangeSearch}
 
                    />
                  </div>
                  <div className="col-md mt-2">
                    <input
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      className="form-control"
                      value={searchData.first_name}
                      onChange={handlChangeSearch}
 
/>
                  </div>

                </div>
                <div className="row text-center">
                <div className="col-md mt-2">
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Last Name"

                      className="form-control"
                      value={searchData.last_name}
                      onChange={handlChangeSearch}

                    />
                  </div>
                  <div className="col-md mt-2">
                    <input
                      type="text"
                      name="status"
                      placeholder="Status"
                      className="form-control"
                      value={searchData.status}
                      onChange={handlChangeSearch}

                    />
                  </div>
                  <div className="col-md mt-2">
                    <input
                      type="text"
                      name="date"
                      placeholder="Date"
                      className="form-control"
                      value={searchData.date}
                      onChange={handlChangeSearch}

                    />
                  </div>
                </div>
                <div className="row text-center">
                <div className="col-md mt-2">

                        <input type="button" value="Search" onClick={getDataOrders} className="btn btn-dark w-100" />
                </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
          <Breadcrumb PathPage={breadcumb} ActivePage="Orders"/>
          <section className="py-5">
            <div className="container">
        <div className="row">
                <table className="table">
                    <thead>
<tr>

                    <th className='text-start'>#</th>
                    <th className='text-start'>First Name</th>
                    <th className='text-start'>Last Name</th>
                    <th className='text-start'>Product</th>
                    <th className='text-start'>Status</th>
                    <th className='text-start'>Qte</th>
                    <th colSpan={2}></th>
</tr>
                    </thead>
                    <tbody>
                        {orders.map((item,index)=>(
                        <tr key={index}>
                            
                        <td></td>
                        <td className='text-start'>{item.user.first_name}</td>
                        <td className='text-start'>{item.user.last_name}</td>
                        <td className='text-start'>{item.product.name}</td>
                        <td className='text-start'>{item.status}</td>
                        <td className='text-start'>{item.qte}</td>
                        {/* <td className="text-start">
                            <span className="Icon Icon_delete" onClick={deleteItem.bind(this,item._id)} style={{paddingBottom:"0px"}}>
                                <ion-icon   name="trash-outline"></ion-icon>
                            </span>

                        </td>
                        <td className="text-start">
                            <span  className="Icon Icon_update" data-bs-toggle="modal" data-bs-target="#modelForm"  onClick={loadItem.bind(this,item)} style={{paddingBottom:"0px"}}>

                        <ion-icon   name="pencil-outline" ></ion-icon>
                            </span>

                        </td> */}
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    <section className="py-5">
        <div className="container">
                <span onClick={navigateData.bind(this,"prev")} style={{paddingBottom:"0px"}} className="Icon Icon_details">
                    <ion-icon  name="chevron-back-outline"></ion-icon>
                </span>
                &nbsp;
                <span onClick={navigateData.bind(this,"next")} style={{paddingBottom:"0px"}} className="Icon Icon_details">
                    <ion-icon  name="chevron-forward-outline"></ion-icon>
                </span>
        </div>
    </section>


    </>
  )
}

export default Orders
