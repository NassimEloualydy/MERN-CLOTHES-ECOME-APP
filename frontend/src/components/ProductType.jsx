import React,{useState,useEffect} from 'react'
import Menu from './Menu'
import { API_URL } from '../config/config'
import toastr from 'toastr'
const ProductType = () => {
    const [breadcumb,setBreadcumb]=useState(["Home"])
    const [menu,setMenu]=useState(false);
    var offset=0;
    const [types,setTypes]=useState([]);
    const [searchData,setSearchData]=useState({
        name:"",description:""
    })
    const  handleChangeSearch=(e)=>{
        setSearchData({...searchData,[e.target.name]:e.target.value});
        
    }
    const MenuSwitch=(data)=>{
        setMenu(!menu)
      }
    const [productType,setProductType]=useState({
        name:"",
        description:"",
        color:"",
        _id:"",
    })
    const handleChange=(e)=>{
        setProductType({...productType,[e.target.name]:e.target.value})

    }
    const submitProductType=()=>{
        const {data}=JSON.parse(localStorage.getItem("user"))

        fetch(`${API_URL}/ProductType/submitProductType`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${data}`
            },
            body:JSON.stringify(productType)
        }).then(res=>res.json()).then(res=>{
          if(res.err)
            toastr.warning(res.err,"Warning",{positionClass:"toast-bottom-right"})
          if(res.msg){
            toastr.success(res.msg,"Success",{positionClass:"toast-bottom-right"})
            getData();
          }
        }).catch(err=>console.log(err))

    }
    const getData=()=>{
        const {data}=JSON.parse(localStorage.getItem("user"))

        fetch(`${API_URL}/ProductType/getData/${offset}`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${data}`
            },
            body:JSON.stringify(searchData)
        }).then(res=>res.json()).then(res=>{
          if(res.data)
            setTypes(res.data);
            if(res.msg){
            toastr.success(res.msg,"Success",{positionClass:"toast-bottom-right"})
          }
        }).catch(err=>console.log(err))

    }
    const  deleteItem=(id)=>{
        const {data}=JSON.parse(localStorage.getItem("user"))

        fetch(`${API_URL}/ProductType/deleteProductType/${id}`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${data}`
            },
        }).then(res=>res.json()).then(res=>{
          if(res.err)
            toastr.warning(res.err,"Warning",{positionClass:"toast-bottom-right"})
          if(res.msg){
            toastr.success(res.msg,"Success",{positionClass:"toast-bottom-right"})
            getData();
          }
        }).catch(err=>console.log(err))

    }
    const loadItem=(data)=>{
        setProductType(data);
    }
    const hideData=()=>{
        setProductType({
            name:"",
            description:"",
            color:"",
            _id:"",
    
        })   
    }
    useEffect(()=>{
        getData()
    },[])
    const navigateData=(data)=>{
        if(data=="next"){
            offset=offset+6
        }
        if(data=="prev" && offset>0){
            offset=offset-6
        }
        getData()
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
        <h3 className='fw-bolder'>Product Type</h3>
        <div className="container">
            <form action="">
                <div className="row text-center">
                    <div className="col-md mt-2"><input type="text" name="name" onChange={handleChangeSearch}    placeholder='Name' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="description" onChange={handleChangeSearch}   placeholder='Description' className="form-control" /></div>
                </div>
                <div className="row text-center">
                    <div className="col-md mt-2">
                        <input type="button" value="Search" onClick={getData}  className="btn btn-dark w-100" />
                    </div>
                </div>
            </form>
        </div>

    </div>
</div>

</div>
<section >
            <div className="container">
        <div className="row mt-5">
            <div className="col-md">
                
                <input type="button" value="New" data-bs-toggle="modal" data-bs-target="#modelForm" className="btn btn-dark" />
            </div>
            </div>
        </div>
    </section>
    <section className="modal fade" id="modelForm">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>Category Form</h5>
                    <button className="btn-close"  aria-label='close' onClick={hideData} data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                    <div className="form">
                        <div className="row">
                            <div className="col-md mt-2">
                                <div className="label-control">Name</div>
                                <input type="text" name="name" value={productType.name} id="" onChange={handleChange} className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md mt-2">
                                <div className="label-control">Description</div>
                                <input type="text" name="description" value={productType.description} id="" onChange={handleChange} className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md mt-2">
                                <div className="label-control">Color</div>
                                <input type="text" name="color" value={productType.color} id="" onChange={handleChange} className="form-control" />
                            </div>
                        </div>

<div className="row">
    <div className="col-md mt-2">
        <input type="button" value="Submit" onClick={submitProductType}  className="btn btn-dark" />
    </div>
</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section >
<div className="container">
        <div className="row mt-2">
            <div className="col-md">
                
                <table className="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Color</th>
                        <th>Description</th>
                        <th colSpan={2}></th>
                    </tr>
                    </thead>
                    <tbody>
                        {types.map((item,index)=>(                            
                                <tr key={index}>
                                    <td className="text-start">#</td>
                                    <td className="text-start">{item.name}</td>
                                    <td className="text-start">{item.color}</td>
                                    <td className="text-start">{item.description}</td>
                                    <td className="text-start">
                            <span className="Icon Icon_delete" onClick={deleteItem.bind(this,item._id)} style={{paddingBottom:"0px"}}>
                                <ion-icon   name="trash-outline"></ion-icon>
                            </span>
                            &nbsp;
                            
                            <span  className="Icon Icon_update" data-bs-toggle="modal" data-bs-target="#modelForm"  onClick={loadItem.bind(this,item)} style={{paddingBottom:"0px"}}>

                        <ion-icon   name="pencil-outline" ></ion-icon>
                            </span>

                        </td>

                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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

export default ProductType
