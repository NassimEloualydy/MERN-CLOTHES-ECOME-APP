import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import { API_URL } from "../config/config";
import toastr, { options } from "toastr";
import { CMultiSelect } from "@coreui/react-pro";
import "@coreui/coreui-pro/dist/css/coreui.min.css";
import { useNavigate } from 'react-router-dom'

const Product = () => {
  const navigate=useNavigate()

  const [breadcumb, setBreadcumb] = useState(["Home"]);
  const [menu, setMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  var offset = 0;
  const [searchData, setSearchData] = useState({
    name: "",
    price: "",
    category: "",
    qte: "",
    description: "",
    rating: "",
    status: "",
    size: "",
  });

  const handleChangeSearch = (e) => {
    if (!Array.isArray(e)) {
      setSearchData({ ...searchData, [e.target.name]: e.target.value });
    } else {
      if(e.target)
      setSearchData({ ...searchData, size: e.target.value });
    }
  };
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    _id: "",
    name: "",
    price: "",
    category: "",
    qte: "",
    size: "",
    description: "",
    rating: "",
    status: "",
  });
  var [sizes, setSizes] = useState([
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "2XL", label: "2XL" },
    { value: "3XL", label: "3XL" },
  ]);
  const navigateData = (data) => {
    if (data == "next") {
      offset = offset + 6;
    }
    if (data == "prev" && offset > 0) {
      offset = offset - 6;
    }
    getData();
  };

  const getProductTypes = () => {
    const { data } = JSON.parse(localStorage.getItem("user"));
    fetch(`${API_URL}/product/getProductTypes`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${data}`,
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setCategories(res.data);
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };
  const [productFormData, setProductFormData] = useState(new FormData());
  const handleChange = (e) => {
    if (!Array.isArray(e)) {
      const value =
        e.target.type == "file" ? e.target.files[0] : e.target.value;
      setProduct({ ...product, [e.target.name]: value });
      productFormData.set(e.target.name, value);
    } else {
      setProduct({ ...product, sizes: JSON.stringify(e) });
      productFormData.set("sizes", JSON.stringify(e));
    }
  };
  const submitProduct = () => {
    const { data } = JSON.parse(localStorage.getItem("user"));
    productFormData.set("_id",product._id)
    fetch(`${API_URL}/product/submitProduct`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        // "Content-Type":"application/json",
        Authorization: `Bearer ${data}`,
      },
      body: productFormData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.err)
          toastr.warning(res.err, "Warning", {
            positionClass: "toast-bottom-right",
          });
        if (res.msg) {
          toastr.success(res.msg, "Success", {
            positionClass: "toast-bottom-right",
          });
          hideData();
          getData();
        }
      })
      .catch((err) => console.log(err));
  };
  const getData = () => {
    const { data } = JSON.parse(localStorage.getItem("user"));

    fetch(`${API_URL}/product/getData/${offset}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${data}`,
      },
      body: JSON.stringify(searchData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) setProducts(res.data);
        if (res.msg) {
          toastr.success(res.msg, "Success", {
            positionClass: "toast-bottom-right",
          });
        }``
      })
      .catch((err) => console.log(err));
  };

  const MenuSwitch = (data) => {
    setMenu(!menu);
  };
  const hideData = () => {
    setProduct({
      _id: "",
      name: "",
      price: "",
      category: "",
      qte: "",
      size: "",
      description: "",
      rating: "",
      status: "",
    });
    setProductFormData(new FormData());
    for (var i = 0; i < sizes.length; i++) {
      sizes[i].selected = false;
    }
  };

  useEffect(() => {
    getProductTypes();
    getData();
  }, []);
  const deleteData=(id)=>{
    const {data}=JSON.parse(localStorage.getItem("user"))

    fetch(`${API_URL}/product/deleteProduct/${id}`,{
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
  const ProductInfo=(_id)=>{
    navigate(`/ProductInfo/${_id}`)

  }
  const  loadData=(data)=>{
    setProduct({
        _id:data._id,
        name:data.name,
        price: data.price,
        category: data.category._id,
        qte: data.qte,
        description: data.description,
        rating: data.rating,
        status: data.status,
        size: data.sizes,
    })

    // setProductFormData(new FormData())
    productFormData.set("_id",data._id);
    productFormData.set("price",data.price);
    productFormData.set("category",data.category._id);
    productFormData.set("qte",data.qte);
    productFormData.set("description",data.description);
    productFormData.set("rating",data.rating);
    productFormData.set("status",data.status);
    productFormData.set("size",data.size);
    productFormData.set("name",data.name);
    for (var i = 0; i < data.sizes.split(',').length; i++) {
        for(var j = 0; j < sizes.length; j++){
            if(sizes[j].value==data.sizes.split(',')[i]){
                sizes[j].selected=true
                break
            }
        }
      }
  
  }
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
            <h3 className="fw-bolder">Products</h3>
            <div className="container">
              <form action="">
                <div className="row text-center">
                  <div className="col-md mt-2">
                    <input
                      type="text"
                      name="name"
                      value={searchData.name}
                      onChange={handleChangeSearch}
                      placeholder="Name"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md mt-2">
                    <input
                      type="text"
                      name="price"
                      value={searchData.price}
                      onChange={handleChangeSearch}
                      placeholder="Price"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md mt-2">
                    <input
                      type="text"
                      name="category"
                      value={searchData.category}
                      onChange={handleChangeSearch}
                      placeholder="Category"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md mt-2">
                    <input
                      type="text"
                      name="qte"
                      value={searchData.qte}
                      onChange={handleChangeSearch}
                      placeholder="Qte"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row text-center">
                  <div className="col-md mt-2">
                    <input
                      type="text"
                      name="description"
                      value={searchData.description}
                      onChange={handleChangeSearch}
                      placeholder="Description"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md mt-2">
                    <input
                      type="text"
                      name="rating"
                      value={searchData.rating}
                      onChange={handleChangeSearch}
                      placeholder="Rating"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md mt-2">
                    <input
                      type="text"
                      name="status"
                      value={searchData.status}
                      onChange={handleChangeSearch}
                      placeholder="Status"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md mt-2">
                    <CMultiSelect
                      options={sizes}
                      name="size"
                      onChange={handleChangeSearch}
                    />
                  </div>
                </div>
                <div className="row text-center">
                  <div className="col-md mt-2">
                    <input
                      type="button"
                      value="Search"
                      className="btn btn-dark w-100"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="row mt-5">
            <div className="col-md">
              <input
                type="button"
                value="New"
                data-bs-toggle="modal"
                data-bs-target="#modelForm"
                className="btn btn-dark"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="modal fade" id="modelForm">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Product</h5>
              <button
                className="btn-close"
                aria-label="close"
                onClick={hideData}
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form">
                <div className="row">
                  <div className="col-md mt-2">
                    <div className="label-control">Photo 1</div>
                    <input
                      type="file"
                      name="photo_1"
                      id=""
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md mt-2">
                    <div className="label-control">Photo 2</div>
                    <input
                      type="file"
                      name="photo_2"
                      id=""
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md mt-2">
                    <div className="label-control">Photo 3</div>
                    <input
                      type="file"
                      name="photo_3"
                      id=""
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md mt-2">
                    <div className="label-control">Photo 4</div>
                    <input
                      type="file"
                      name="photo_4"
                      id=""
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md mt-2">
                    <div className="label-control">Photo 5</div>
                    <input
                      type="file"
                      name="photo_5"
                      id=""
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md mt-2">
                    <div className="label-control">Name</div>
                    <input
                      type="text"
                      name="name"
                      value={product.name}
                      id=""
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md mt-2">
                    <div className="label-control">Description</div>
                    <input
                      type="text"
                      name="description"
                      value={product.description}
                      id=""
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md mt-2">
                    <div className="label-control">Price</div>
                    <input
                      type="text"
                      name="price"
                      value={product.price}
                      id=""
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md mt-2">
                    <div className="label-control">Category</div>
                    <select
                      name="category"
                      value={product.category}
                      id=""
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="">Choose a category</option>(
                      {categories.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                      )
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md mt-2">
                    <div className="label-control">Quantity</div>
                    <input
                      type="text"
                      name="qte"
                      value={product.qte}
                      id=""
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md mt-2">
                    <CMultiSelect
                      options={sizes}
                      label="Sizes"
                      name="size"
                      onChange={handleChange}
                    />
                    {/* <select  name="size" value={product.size} id="" onChange={handleChange} className="form-control" >

                                    <option value="">Choose a size</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="2XL">2XL</option>
                                    <option value="3XL">3XL</option>
                                </select> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md mt-2">
                    <div className="label-control">Rating</div>
                    <input
                      type="text"
                      name="rating"
                      value={product.rating}
                      id=""
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md mt-2">
                    <div className="label-control">Status</div>
                    <select
                      id=""
                      name="status"
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="">Choose a status</option>
                      <option value="In Stock">In Stock</option>
                      <option value="Solde out">Solde out</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md mt-2">
                    <input
                      type="button"
                      value="Submit"
                      onClick={submitProduct}
                      className="btn btn-dark"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="row">
            {products.map((item, index) => (
              <div  key={index} className="col-md-6 col-lg-4 mt-2">
                <div className="card" style={{ position: "relative" }}>
                  {item.status == "In Stock" && (
                    <>
                      <span
                        style={{
                          position: "absolute",
                          top: "5px",
                          left: "5px",
                          paddingBottom: "0px",
                          backgroundColor: "#2a9d8f",
                        }}
                        className="badge pb-1"
                      >
                        {item.status}
                      </span>
                    </>
                  )}
                  {item.status == "Solde out" && (
                    <>
                      <span
                        style={{
                          position: "absolute",
                          top: "5px",
                          left: "5px",
                          paddingBottom: "0px",
                          backgroundColor: "#e76f51",
                        }}
                        className="badge pb-1"
                      >
                        {item.status}
                      </span>
                    </>
                  )}

                  <span style={{position: "absolute", top: "2px",right: "5px",paddingBottom:"0px"}} onClick={deleteData.bind(this,item._id)} className="Icon Icon_delete">
                            <ion-icon   name="trash-outline"></ion-icon>
                    </span>
                    <span style={{position: "absolute", top: "2px",right: "35px",paddingBottom:"0px"}} data-bs-toggle="modal" data-bs-target="#modelForm" onClick={loadData.bind(this,item)} className="Icon Icon_update">
                            <ion-icon   name="pencil-outline"></ion-icon>
                    </span>

                  <img onClick={ProductInfo.bind(this,item._id)}
                    src={`${API_URL}/product/getPhoto/${item._id}/photo_1`}
                    alt=""
                    className="card-img-top img-main img-fluid imgProduct"
                  />
                  <div className="card-body">
                    <div className="card-text text-center">
                      <div className="d-flex text-start">
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Name</div>
                          <div className="fw-normal">{item.name}</div>
                        </div>
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Price</div>
                          <div className="fw-normal">{item.price} $</div>
                        </div>
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Category</div>
                          <div className="fw-normal">{item.category.name}</div>
                        </div>
                      </div>

                      <div className="d-flex text-start">
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Qte</div>
                          <div className="fw-normal">{item.qte}</div>
                        </div>
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Size</div>
                          <div className="fw-normal">
                            {item.sizes.split(",").map((it, ind) => (
                               <span key={ind}>
                                                              {it=='3XL' && (                              
                                <span
                                style={{
                                  margin: "1px",
                                  paddingBottom: "0px",
                                  backgroundColor: "#0d1b2a",
                                }}
                                className="badge pb-1"
                              >
                                {it}
                              </span>
)}

                                                              {it=='2XL' && (                              
                                <span
                                style={{
                                  margin: "1px",
                                  paddingBottom: "0px",
                                  backgroundColor: "#e76f51",
                                }}
                                className="badge pb-1"
                              >
                                                                {it}

                              </span>
)}

                                                              {it=='XL' && (                              
                                <span
                                style={{
                                  margin: "1px",
                                  paddingBottom: "0px",
                                  backgroundColor: "#f4a261",
                                }}
                                className="badge pb-1"
                              >
                                                                {it}

                              </span>
)}

                                                              {it=='L' && (                              
                                <span
                                style={{
                                  margin: "1px",
                                  paddingBottom: "0px",
                                  backgroundColor: "#e9c46a",
                                }}
                                className="badge pb-1"
                              >
                                                                {it}

                              </span>
)}

                            {it=='M' && (                              
                                <span
                                style={{
                                  margin: "1px",
                                  paddingBottom: "0px",
                                  backgroundColor: "#2a9d8f",
                                }}
                                className="badge pb-1"
                              >
                                                                {it}

                              </span>
)}

                               {it=='S' && (                              
                                <span
                                style={{
                                  margin: "1px",
                                  paddingBottom: "0px",
                                  backgroundColor: "#264653",
                                }}
                                className="badge pb-1"
                              >
                                                                {it}

                              </span>
)}
                               </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* <div className="d-flex text-start">
                                <div className="row py-2 p-3">
                                        <div className="fw-bolder">Comptences</div>
                                        <div className="fw-normal">  {item.comptences.map((competence, index) => (
              <span className='badge bg-secndary m-2' style={{backgroundColor:competence.color}}  key={index}>{competence.name}</span>
            ))}</div>


                                    </div>
                                </div> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <span
            onClick={navigateData.bind(this, "prev")}
            style={{ paddingBottom: "0px" }}
            className="Icon Icon_details"
          >
            <ion-icon name="chevron-back-outline"></ion-icon>
          </span>
          &nbsp;
          <span
            onClick={navigateData.bind(this, "next")}
            style={{ paddingBottom: "0px" }}
            className="Icon Icon_details"
          >
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </span>
        </div>
      </section>
    </>
  );
};

export default Product;
