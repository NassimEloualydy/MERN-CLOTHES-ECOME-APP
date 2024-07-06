import React,{useState,useEffect} from 'react'
import Menu from './Menu'
import { useNavigate,useParams } from 'react-router-dom';
import { API_URL } from '../config/config'
import toastr from 'toastr'
import { Navigation,Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Breadcrumb from './Breadcrumb';


const ProductInfo = () => {
  SwiperCore.use([Autoplay]);

    const [breadcumb,setBreadcumb]=useState(["Home","Products"])
    const [menu,setMenu]=useState(false);
    const [urlPhoto,setUrlPhoto]=useState('')
    const [stars,setStars]=useState([])
    const MenuSwitch=(data)=>{
        setMenu(!menu)
      }
    
      const [product, setProduct] = useState({
        _id: "",
        name: "",
        price: "",
        category: "",
        qte: "",
        sizes: "",
        description: "",
        rating: "",
        status: "",
      });
    


      const {_id}=useParams();
      const changePhto=(photo_url)=>{
        setUrlPhoto(`${API_URL}/product/getPhoto/${product._id}/${photo_url}`)
        document.getElementById("photo_1").classList.remove('img_selected')
        document.getElementById("photo_3").classList.remove('img_selected')
        document.getElementById("photo_4").classList.remove('img_selected')
        document.getElementById("photo_5").classList.remove('img_selected')
        document.getElementById("photo_2").classList.remove('img_selected')
        document.getElementById(photo_url).classList.toggle('img_selected')

      }
      const getData=()=>{
        const { data } = JSON.parse(localStorage.getItem("user"));
        fetch(`${API_URL}/product/getProductInfo/${_id}`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${data}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.Data) {
              setProduct(res.Data);
              setUrlPhoto(`${API_URL}/product/getPhoto/${res.Data._id}/photo_1`)
              const da=[]
              for(var i=0;i<res.Data.rating;i++){
                        da.push(res.Data.rating)      
                      }
              setStars(da)
            } else {
              console.log(res);
            }
          })
          .catch((err) => console.log(err));
      }
      useEffect(()=>{

        getData()
        changePhto('photo_1')
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
                <h3 className='fw-bolder'>{product.name}</h3>

            </div>
        </div>

    </div>
          <Breadcrumb PathPage={breadcumb} ActivePage={product.name}/>


    <section className="">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-4 mt-2">
                    <div className="card">
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
                  <img 
                    src={`${urlPhoto}`}
                    
                    className="card-img-top img-main img-fluid imgProduct"
                  />
                  <div className="card-body">
                    <div className="card-text text-center">
                      <hr />
                      <div className="d-flex">

                        <Swiper
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
              slidesPerView: 4,
      //        spaceBetween: 10,
            },
            "@0.75": {
              slidesPerView: 4,
        //      spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 4,
          //    spaceBetween: 40,
            },
            "@1.50": {
              slidesPerView: 4,
            //  spaceBetween: 50,
            },
          }}
      
      onSlideChange={() => console.log('slide change')}
    >
                              <SwiperSlide onClick={changePhto.bind(this,'photo_1')}  className="col-md-3 col-lg-3">
                                            <img 
                    src={`${API_URL}/product/getPhoto/${product._id}/photo_1`}
                    id="photo_1"
                    className="card-img-top img-main img-fluid imgProductSecond"
                  />

                        </SwiperSlide>
                              <SwiperSlide onClick={changePhto.bind(this,'photo_2')}  className="col-md-3 col-lg-3">
                                            <img 
                    src={`${API_URL}/product/getPhoto/${product._id}/photo_2`}
                    id="photo_2"
                    className="card-img-top img-main img-fluid imgProductSecond"
                  />

                        </SwiperSlide>

       <SwiperSlide   onClick={changePhto.bind(this,'photo_3')}  className="col-md-3 col-lg-3">


                                            <img 
                    src={`${API_URL}/product/getPhoto/${product._id}/photo_3`}
                    id="photo_3"
                    className="card-img-top img-main img-fluid imgProductSecond"
                  />
 </SwiperSlide>

                        <SwiperSlide onClick={changePhto.bind(this,'photo_4')}  className="col-md-3 col-lg-3">
                                            <img 
                    src={`${API_URL}/product/getPhoto/${product._id}/photo_4`}
                    id="photo_4"
                    className="card-img-top img-main img-fluid imgProductSecond"
                  />

                        </SwiperSlide>
                        <SwiperSlide onClick={changePhto.bind(this,'photo_5')}  className="col-md-3 col-lg-3">
                                            <img 
                    src={`${API_URL}/product/getPhoto/${product._id}/photo_5`}
                    id="photo_5"
                    className="card-img-top img-main img-fluid imgProductSecond"
                  />

                        </SwiperSlide>
                        <br />
                        </Swiper>

                      </div>

                      {/* <div className="d-flex text-start">
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Name</div>
                          <div className="fw-normal">{product.name}</div>
                        </div>
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Price</div>
                          <div className="fw-normal">{product.price} $</div>
                        </div>
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Category</div>
                          <div className="fw-normal">{product.category.name}</div>
                        </div>
                      </div> */}

                      {/* <div className="d-flex text-start">
                        <div className="row py-2 p-3">
                          <div className="fw-bolder">Qte</div>
                          <div className="fw-normal">{product.qte}</div>
                        </div>
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

                    </div>
                  </div>

                    </div>
            </div>
            <div className="col-md-6 col-lg-8 mt-2">
              <div className="card">
                <div className="card-body">
                      <span className="fw-bolder h3">{product.name}</span>
                      <br />
                      <span className="fw-bolder text-danger">{product.price} MAD</span>
                      
                      <br />
                      <br />
                      <span className='fw-normale'> Quantity : </span> 
                      <span className="fw-bolder"> {product.qte} </span>
                      <hr />
                      <span className='fw-normale'> Category : </span> 
                      <span className="fw-bolder"> {product.category.name} </span>
                      <hr />
                      <span className='fw-normale'> Sizes : </span> 
                      <span className="fw-bolder"> {product.sizes.split(",").map((it, ind) => (
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
                            ))}</span>
                      <hr />
                      <span className='fw-normale'> Rating : </span> 
                        {stars.map((item,index)=>(
                      <span className="icon_stare mt-2">
                           <ion-icon  name="star"></ion-icon> 
                        </span> 
                          
                        ))}
                      <hr />
                      <span className='fw-normale'> Description : </span> 
                      <span className="fw-bolder"> {product.description} </span>


                </div>
              </div>
            </div>
            </div>
            </div>
            </section>

 
    </>
  )
}

export default ProductInfo
