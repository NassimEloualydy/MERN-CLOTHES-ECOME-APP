import React,{useState,useEffect} from 'react'
import Menu from './Menu'
import Breadcrumb from './Breadcrumb';
import { API_URL } from '../config/config'
import toastr from 'toastr'
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation,Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Home = () => {

  SwiperCore.use([Autoplay]);
  const [breadcumb,setBreadcumb]=useState(["Home"])
    const [menu,setMenu]=useState(false);
    const [products,setProduct]=useState([])
    const [categories,setCategories]=useState([])
    const MenuSwitch=(data)=>{
        setMenu(!menu)
      }
    const getProductForHome=()=>{
      const {data}=JSON.parse(localStorage.getItem("user"))

      fetch(`${API_URL}/product/getProductFormHome`,{
          method:"POST",
          headers:{
              "Accept":"application/json",
              "Content-Type":"application/json",
              "Authorization":`Bearer ${data}`
          },
      }).then(res=>res.json()).then(res=>{
        if(res.data){
          setProduct(res.data.produts)
          
          console.log(res.data.produts)
          setCategories(res.data.categories)
          
        }
        else
        console.log(res)
      }).catch(err=>console.log(err))


    }
useEffect(()=>{
  getProductForHome()
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
                <h3 className='fw-bolder'>Sigma Shop</h3>
                
            </div>
        </div>

    </div>
    <section>
      {categories.map((item,index)=>(
        <section className='mb-2'>
        <div key={index} className="text-start fw-bolder m-5 mt-3 mb-0 mr-0 titleCategHome" >
          {item.name}
        </div>
        <Swiper
        className='swiperCutomSize'
 
// install Swiper modules
modules={[Navigation, Pagination, Scrollbar, A11y]}
spaceBetween={50}
slidesPerView={4}
// navigation
pagination={{ clickable: true }}
// scrollbar={{ draggable: true }}
onSwiper={(swiper) => console.log(swiper)}
// loop
autoplay={{
delay:3000,
disableOnInteraction: false
}}
breakpoints={{
"@0.00": {
slidesPerView: 1,
//        spaceBetween: 10,
},
"@0.75": {
slidesPerView: 1,
//      spaceBetween: 10,
},
"@1.00": {
slidesPerView: 1,
//    spaceBetween: 40,
},
"@1.50": {
slidesPerView: 4,
//  spaceBetween: 50,
},
}}

onSlideChange={() => console.log('slide change')}
>
        {products.map((product,i)=>(
          <>
{          (item.name==product.category.name) && (

      
      <SwiperSlide className="col-md-3 col-lg-3" key={index}>

      <div className="card" style={{ position: "relative" }}>

                  {product.status == "In Stock" && (
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
                        {product.status}
                      </span>
                    </>
                  )}
                  {product.status == "Solde out" && (
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
                        {product.status}
                      </span>
                    </>
                  )}
      {(product.rating=='1') && (                      
                        <span className="icon_stare mt-2" style={{
                          position: "absolute",
                          top: "-5px",
                          right: "5px",
                          paddingBottom: "0px",
                        }}>
                           <ion-icon  name="star"></ion-icon> 
                        </span> 
)}
      {(product.rating=='2') && (  
        <>
                        <span className="icon_stare mt-2" style={{
                          position: "absolute",
                          top: "-5px",
                          right: "5px",
                          paddingBottom: "0px",
                        }}>
                           <ion-icon  name="star"></ion-icon> 
                        </span>
                        <span className="icon_stare mt-2" style={{
                          position: "absolute",
                          top: "-5px",
                          right: "20px",
                          paddingBottom: "0px",
                        }}>
                           <ion-icon  name="star"></ion-icon> 
                        </span> 
                          </>                    
                         
)}
      {(product.rating=='3') && (  
        <>
                        <span className="icon_stare mt-2" style={{
                          position: "absolute",
                          top: "-5px",
                          right: "5px",
                          paddingBottom: "0px",
                        }}>
                           <ion-icon  name="star"></ion-icon> 
                        </span> 
                        <span className="icon_stare mt-2" style={{
                          position: "absolute",
                          top: "-5px",
                          right: "20px",
                          paddingBottom: "0px",
                        }}>
                           <ion-icon  name="star"></ion-icon> 
                        </span> 
                        <span className="icon_stare mt-2" style={{
                          position: "absolute",
                          top: "-5px",
                          right: "35px",
                          paddingBottom: "0px",
                        }}>
                           <ion-icon  name="star"></ion-icon> 
                        </span> 
                          </>                    
)}
      {(product.rating=='4') && (         
        <>
                        <span className="icon_stare mt-2" style={{
                          position: "absolute",
                          top: "-5px",
                          right: "5px",
                          paddingBottom: "0px",
                        }}>
                           <ion-icon  name="star"></ion-icon> 
                        </span> 
                        <span className="icon_stare mt-2" style={{
                          position: "absolute",
                          top: "-5px",
                          right: "20px",
                          paddingBottom: "0px",
                        }}>
                           <ion-icon  name="star"></ion-icon> 
                        </span> 
                        <span className="icon_stare mt-2" style={{
                          position: "absolute",
                          top: "-5px",
                          right: "35px",
                          paddingBottom: "0px",
                        }}>
                           <ion-icon  name="star"></ion-icon> 
                        </span> 
                        <span className="icon_stare mt-2" style={{
                          position: "absolute",
                          top: "-5px",
                          right: "50px",
                          paddingBottom: "0px",
                        }}>
                           <ion-icon  name="star"></ion-icon> 
                        </span> 

                          </>             
)}

{(product.rating=='5') && ( 
  <>
                        <span className="icon_stare mt-2" style={{
                          position: "absolute",
                          top: "-5px",
                          right: "5px",
                          paddingBottom: "0px",
                        }}>
                           <ion-icon  name="star"></ion-icon> 
                        </span> 
                        <span className="icon_stare mt-2" style={{
                          position: "absolute",
                          top: "-5px",
                          right: "20px",
                          paddingBottom: "0px",
                        }}>
                           <ion-icon  name="star"></ion-icon> 
                        </span> 
                        <span className="icon_stare mt-2" style={{
                          position: "absolute",
                          top: "-5px",
                          right: "35px",
                          paddingBottom: "0px",
                        }}>
                           <ion-icon  name="star"></ion-icon> 
                        </span> 
                        <span className="icon_stare mt-2" style={{
                          position: "absolute",
                          top: "-5px",
                          right: "50px",
                          paddingBottom: "0px",
                        }}>
                           <ion-icon  name="star"></ion-icon> 
                        </span> 

       <span className="icon_stare mt-2" style={{
                          position: "absolute",
                          top: "-5px",
                          right: "65px",
                          paddingBottom: "0px",
                        }}>
                           <ion-icon  name="star"></ion-icon> 
                        </span> 
                          </>                     
)}


                  <img 
                    src={`${API_URL}/product/getPhoto/${product._id}/photo_1`}
                    alt=""
                    className="card-img-top img-main img-fluid imgProduct"
                  />
                  <div className="card-body">
                    <div className="card-text text-center">
                      <div className="d-flex text-start">
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Name</div>
                          <div className="fw-normal">{product.name}</div>
                        </div>
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Price</div>
                          <div className="fw-normal">{product.price} $</div>
                        </div>
                      </div>

                      {/* <div className="d-flex text-start">
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Size</div>
                          <div className="fw-normal">
                            {product.sizes.split(",").map((it, ind) => (
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
                      </div> */}
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

                <br />
                <br />
                        </SwiperSlide>
      )
}
      </>
      ))}
      </Swiper>
    </section>
  ))}

      
    </section>
    </>
  )
}

export default Home
