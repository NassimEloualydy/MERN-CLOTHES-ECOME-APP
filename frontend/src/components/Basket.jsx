import React,{ forwardRef,useState, useEffect, useImperativeHandle } from 'react'
import { API_URL } from "../config/config";
import toastr from "toastr";
import { useNavigate } from 'react-router-dom'

const Basket = forwardRef((props, ref) => {
    const [nbrProducts,setNbrProducts]=useState(0)
  const navigate=useNavigate()

    useEffect(()=>{
        const { data } = JSON.parse(localStorage.getItem("user"));
        fetch(`${API_URL}/basket/getMyBasket/`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${data}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
    if (res.err)
      toastr.warning(res.err, "Warning", {
        positionClass: "toast-bottom-right",
      });
    if (res.data) {
      setNbrProducts(parseInt(res.data)+1)
    }
          })
          .catch((err) => console.log(err));
    

    },[])
    const gotPaiment=()=>{
      navigate("/Paiment") 
    }
    useImperativeHandle(ref, () => ({
        
        addToBasket(_id) {
            const { data } = JSON.parse(localStorage.getItem("user"));
            fetch(`${API_URL}/basket/addBasket/${_id}`, {
              method: "POST",
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${data}`,
              },
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
          setNbrProducts(nbrProducts+1)
        }
              })
              .catch((err) => console.log(err));
        
      }
    }));
  return(
    <>
    <span onClick={gotPaiment} className='basket'>
        <span className='badge' style={{
            backgroundColor: "#2a9d8f",
            fontSize:'10px',
            position:'relative',
            left:'5px',
        }}>{nbrProducts}</span>
        <ion-icon name="cart-outline"></ion-icon>
    </span>
    <section  className="modal fade text-dark" id="modelFormBasket">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>Nassm ELELE</h5>
                    <button className="btn-close"  aria-label='close'  data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                </div>
            </div>
        </div>
    </section>

    </>
  )
})

export default Basket
