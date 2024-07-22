import React,{useState,useEffect} from 'react'
import Menu from './Menu'
import { useNavigate,useParams } from 'react-router-dom';
import { API_URL } from '../config/config'
import toastr from 'toastr'
import Breadcrumb from './Breadcrumb';
const Paiment = () => {
    const [breadcumb,setBreadcumb]=useState(["Home"])
    const [products,setProducts]=useState([]);
  const navigate=useNavigate()
  const [menu,setMenu]=useState(false);
   const MenuSwitch=(data)=>{
    setMenu(!menu)
  }
  const getProductFromBasket=()=>{
    const { data } = JSON.parse(localStorage.getItem("user"));
    fetch(`${API_URL}/basket/getProductFromBasket`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${data}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
            setProducts(res.data);
            for(var i=0;i<res.data.length;i++){
                document.getElementById(res.data[i]._id).value=res.data[i].qte
            }
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  }
  const GoCheckout=()=>{
    navigate("/Checkout")

  }
  const cancelBakset=()=>{
    const { data } = JSON.parse(localStorage.getItem("user"));
    fetch(`${API_URL}/basket/cancelBakset`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${data}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg) {
            toastr.success(res.msg,"Success",{positionClass:"toast-bottom-right"})
            // getProductFromBasket()
            navigate("/")
          } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));


  }
  const deleteProductBasket=(_id)=>{
    const { data } = JSON.parse(localStorage.getItem("user"));
    fetch(`${API_URL}/basket/deleteProductBasket/${_id}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${data}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg) {
            toastr.success(res.msg,"Success",{positionClass:"toast-bottom-right"})
            getProductFromBasket()
          } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));

  }
  const updateBasket=(_id,e)=>{
    if(e.target.value<=0)
      toastr.warning("the quantity must be more then 0","Warning",{positionClass:"toast-bottom-right"})
    else{
      const { data } = JSON.parse(localStorage.getItem("user"));
      var data_info={_id,value:e.target.value}
      fetch(`${API_URL}/basket/updatebasket`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${data}`,
        },
        body:JSON.stringify(data_info)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.msg) {
              toastr.success(res.msg,"Success",{positionClass:"toast-bottom-right"})
              getProductFromBasket()
            } else {
            console.log(res);
          }
        })
        .catch((err) => console.log(err));
      
    }

  }

  useEffect(()=>{
    getProductFromBasket()

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
                <h3 className='fw-bolder'>Paiment</h3>

            </div>
        </div>

    </div>
          <Breadcrumb PathPage={breadcumb} ActivePage="Paiment"/>
    <div className="container">
        <div className="row mt-2">
            <div className="col-md-12 mt-2 col-lg-8">
                <div className="card p-2">

                <table className='table'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Qte</th>
                                <th>Status</th>
                                <th>Price Unite</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item,index)=>(
                                <tr key={index}>
                                    <td className="text-start"></td>
                                    <td className="text-start">{item.product.name}</td>
                                    <td className="text-start">{item.product.price}</td>
                                    <td className="text-start"><input type="text" onChange={updateBasket.bind(this,item._id)}  id={item._id} className="form-control" /></td>
                                    <td className="text-start">
                                       {(item.status=='Confirmed') && (
                                        <span className='badge' style={{backgroundColor: "#2a9d8f"}}>
                                          {item.status}
                                       </span>)}
                                       {(item.status=='In Progress') && (
                                        <span className='badge' style={{backgroundColor: "#e9c46a"}}>
                                          {item.status}
                                       </span>)}
                                       {(item.status=='Canceled') && (
                                        <span className='badge' style={{backgroundColor: "#e76f51"}}>
                                          {item.status}
                                       </span>)}
                                    
                                    </td>
                                    
                                    <td className="text-start">{parseInt(parseInt(item.qte)*parseInt(item.product.price))} MAD</td>
                                    <td className="text-start">
                                    <span className="Icon Icon_delete" onClick={deleteProductBasket.bind(this,item._id)}  style={{paddingBottom:"0px"}}>
                                        <ion-icon   name="trash-outline"></ion-icon>
                                    </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                </table>
                </div>

            </div>
            <div className="col-md-12 mt-2 col-lg-4">
                <div className="card">
                    <div className="card-title fw-bolder m-4 mr-0 mb-0 mt-3">
                            Paiment
                    </div>
                    <hr className='m-4 mt-2 mb-0' />
                    <div className="card-body">
                        <span className="text-start fw-bolder">
                            User : 
                        </span>
                        <span className="text-start fw-normal">
                        {JSON.parse(localStorage.getItem("user")).first_name}&nbsp;
                        {JSON.parse(localStorage.getItem("user")).last_name}
                        </span>
                        <br />
                        <div className="d-flex">

                        <div className="text-start fw-bolder mt-2">
                            Price Total : 
                        </div>
                        <div className="text-start fw-normal mt-2 ml-2">
                        &nbsp;&nbsp;400
                        </div>
                        </div>
<br />
<div className="d-flex">

<div className="text-start fw-bolder mt-2">
    <input type="button" value="Cancel"onClick={cancelBakset}  style={{backgroundColor: "#e76f51"}} className="btn btn-dark" />
</div>
&nbsp;
<div className="text-start fw-normal mt-2 ml-2">
<input type="button" value="Confirm & Checkout" onClick={GoCheckout} style={{backgroundColor: "#2a9d8f"}} className="btn btn-dark" />
</div>
</div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Paiment
